node('nodejs-slave') {
    def docker_push_repo_url = '192.168.91.200:10001'
    def docker_pull_repo_url = '192.168.91.200:10000'
    def docker_compose_path = '/root/compose/yoyou'
    def docker_compose_service = 'fangsea-io-web2'
    def docker_image_name
    def tag = BUILD_ID

    // 测试服务器地址
    def remote_servers = [
        'test': '192.168.91.200']

    stage('Settings branch params') {
        println "设置分支参数"
        if (BRANCH_NAME == 'test') {
            // 设置构建保留的最大个数，超过指定的个数则丢弃
            properties([buildDiscarder(logRotator(numToKeepStr: '10'))])
            docker_image_name = 'yoyou/test/fangsea-io-web2'
        } else {
            error("分支参数设置错误，当前分支：$BRANCH_NAME")
            currentBuild.result = 'FAILURE'
        }
    }

    nodejs('Nodejs8') {
        stage('Preparation') {
            sh 'nrm use taobao'
        }
        stage('Checkout code') {
            // 拉取最新的代码
            checkout scm
        }
        stage('Install package') {
            sh 'nrm ls'
			// 需要提供参数--unsafe-perm=true --allow-root才能install成功
            sh 'npm install --unsafe-perm=true --allow-root'
        }
        stage('Build code') {
            sh "npm run build"
        }
    }

    stage('Archive') {
        echo '归档构建'
        sh 'tar cfz web.tar.gz api node_modules static .nuxt nuxt.config.js package.json package-lock.json'
    }

    stage('Build image') {
        echo '构建 Docker 镜像'
        sh "cp web.tar.gz docker"
        dir('docker') {
            // 根据 Jenkins 最新运行的 Build id 构建模块 Docker 镜像
            sh "docker build -t ${docker_push_repo_url}/${docker_image_name}:${tag} ."
            //  生成 latest 版本 Docker 镜像
            sh "docker tag ${docker_push_repo_url}/${docker_image_name}:${tag} " +
                    "${docker_push_repo_url}/${docker_image_name}:latest"
        }
    }

    stage('Push image') {
        echo '上传 Docker 镜像'
        withCredentials([usernamePassword(credentialsId: 'docker-nexus',
                passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
            sh "docker login -u ${USERNAME} -p ${PASSWORD} ${docker_push_repo_url}"
            sh "docker push ${docker_push_repo_url}/${docker_image_name}:${tag}"
            sh "docker push ${docker_push_repo_url}/${docker_image_name}:latest"
        }
    }

    stage('Clean local image') {
        echo '清理 Build 后的本地镜像'
        def images_id = sh(returnStdout: true,
                script: "docker images -q ${docker_push_repo_url}/${docker_image_name}")
                .split("\r?\n")
        def images_id_set = images_id as Set
        sh "docker rmi -f ${images_id_set.join(' ')}"
    }

    if (BRANCH_NAME == 'test') {
        stage('Remote server redeploy') {
            println "重新部署远程服务器：${BRANCH_NAME}，IP：${remote_servers[BRANCH_NAME]}"
            withCredentials([usernamePassword(credentialsId: 'docker-nexus',
                    passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
                sshagent(credentials: ['docker-deploy']) {
                    def command = """
                            cd ${docker_compose_path};
                            docker login -u ${USERNAME} -p ${PASSWORD} ${docker_pull_repo_url};
                            docker-compose stop ${docker_compose_service};
                            docker-compose rm -f ${docker_compose_service};
                            docker pull ${docker_pull_repo_url}/${docker_image_name}:latest;
                            docker-compose up -d ${docker_compose_service}
                        """
                    sh """ssh root@${remote_servers[BRANCH_NAME]} "$command" """
                }
            }
        }
    }
}