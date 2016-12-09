FROM ubuntu:xenial

RUN \
  # configure the "jbooter" user
  groupadd jbooter && \
  useradd jbooter -s /bin/bash -m -g jbooter -G sudo && \
  echo 'jbooter:jbooter' |chpasswd && \
  mkdir /home/jbooter/app && \

  # install open-jdk 8
  apt-get update && \
  apt-get install -y openjdk-8-jdk && \

  # install utilities
  apt-get install -y \
     wget \
     curl \
     vim \
     git \
     zip \
     bzip2 \
     fontconfig \
     python \
     g++ \
     build-essential && \

  # install node.js
  curl -sL https://deb.nodesource.com/setup_6.x | bash && \
  apt-get install -y nodejs && \

  # upgrade npm
  npm install -g npm && \

  # install yeoman bower gulp yarn
  npm install -g \
    yo \
    bower \
    gulp-cli \
    yarn && \

  # cleanup
  apt-get clean && \
  rm -rf \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*

# copy sources
COPY . /home/jbooter/generator-jbooter

RUN \
  # install jbooter
  npm install -g /home/jbooter/generator-jbooter && \

  # fix jbooter user permissions
  chown -R jbooter:jbooter \
    /home/jbooter \
    /usr/lib/node_modules && \

  # cleanup
  rm -rf \
    /var/lib/apt/lists/* \
    /tmp/* \
    /var/tmp/*

# expose the working directory, the Tomcat port, the BrowserSync ports
USER jbooter
WORKDIR "/home/jbooter/app"
VOLUME ["/home/jbooter/app"]
EXPOSE 8080 3000 3001
CMD ["tail", "-f", "/home/jbooter/generator-jbooter/generators/server/templates/src/main/resources/banner-no-color.txt"]
