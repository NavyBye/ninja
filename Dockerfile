FROM ubuntu:18.04
MAINTAINER hyeyoo@student.42seoul.kr

# Change APT Server to Kakao
RUN sed -i 's/kr.archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list
RUN sed -i 's/archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list
RUN sed -i 's/ports.ubuntu.com/ftp.harukasan.org/g' /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y git curl gcc make libssl-dev zlib1g-dev
RUN apt-get -y install npm vim curl wget

# install PostgreSQL 12.1 from source
# https://levelup.gitconnected.com/installing-postgresql-from-source-ubuntu-ec2-420a3612119b

RUN apt-get install bash
SHELL ["/bin/bash", "-c"]
ENV DB_USER postgres
ENV DB_PASS postgres
ENV DB_NAME postgres
RUN apt-get install -y wget libreadline-dev
RUN wget https://ftp.postgresql.org/pub/source/v12.1/postgresql-12.1.tar.gz
RUN tar xvfz postgresql-12.1.tar.gz
RUN cd postgresql-12.1 && ./configure && make && make install

# install PostgreSQL utilities and Setup

ENV PATH /usr/local/pgsql/bin:$PATH
RUN apt-get install -y sudo
RUN useradd postgres

RUN echo 'export PATH=~/.rbenv/bin:$PATH' >> ~/.bashrc
RUN echo 'export PATH=~/.rbenv/shims:$PATH' >> ~/.bashrc
RUN echo 'export PATH=/usr/local/pgsql/bin:$PATH' >> ~/.bashrc

# install latest stable ruby 3.0.0 (2021/02/07)
# using rbenv (https://kbs4674.tistory.com/187)

ENV PATH ~/.rbenv/bin:$PATH
ENV PATH ~/.rbenv/shims/:$PATH
RUN sudo npm install -g n yarn gem
RUN git clone https://github.com/rbenv/rbenv.git ~/.rbenv
RUN source ~/.bashrc
RUN git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
RUN rbenv install 3.0.0
RUN rbenv rehash
RUN rbenv global 3.0.0
RUN echo 'eval "$(rbenv init -)"' >> ~/.bashrc

# install ruby on rails

RUN gem install rails -v 6.1.1
RUN sudo npm install -g npm@6.14.4
RUN sudo n lts
RUN sudo rm -rf /postgresql-12.1*
RUN apt-get install -y sqlite3 libsqlite3-dev graphviz

WORKDIR /app

RUN bundle config --global silence_root_warning 1
RUN bundle config set --local git.allow_insecure true

EXPOSE 80
EXPOSE 3000
EXPOSE 587

ENV BUNDLE_GEMFILE=/app/Gemfile \
  BUNDLE_JOBS=2 \
  BUNDLE_PATH=/bundle

COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/bin/bash", "-c", "/entrypoint.sh"]
