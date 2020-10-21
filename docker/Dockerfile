FROM registry.cn-beijing.aliyuncs.com/kirsazlid/centos:node-10.15.3-pm2

MAINTAINER Kirsazlid

EXPOSE 80

RUN mkdir /opt/data

WORKDIR /opt/data

COPY run.sh /opt/data/
COPY web.tar.gz /opt/data/

RUN chmod +x run.sh \
 && tar xf web.tar.gz \
 && rm -f web.tar.gz

CMD /opt/data/run.sh