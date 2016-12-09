#!/bin/bash

#-------------------------------------------------------------------------------
# Start docker container
#-------------------------------------------------------------------------------
cd "$HOME"/app
if [[ ("$JBOOTER" == 'app-cassandra') && (-a src/main/docker/cassandra.yml) ]]; then
    docker-compose -f src/main/docker/cassandra.yml up -d

elif [[ ("$JBOOTER" == 'app-mongodb') && (-a src/main/docker/mongodb.yml) ]]; then
    docker-compose -f src/main/docker/mongodb.yml up -d

elif [[ ("$JBOOTER" == 'app-mysql') && (-a src/main/docker/mysql.yml) ]]; then
    docker-compose -f src/main/docker/mysql.yml up -d

elif [[ ("$JBOOTER" == 'app-psql-es-noi18n') ]]; then
    if [ -a src/main/docker/elasticsearch.yml ]; then
        docker-compose -f src/main/docker/elasticsearch.yml up -d
    fi
    if [ -a src/main/docker/postgresql.yml ]; then
        docker-compose -f src/main/docker/postgresql.yml up -d
    fi

elif [[ ("$JBOOTER" == 'app-mariadb-kafka') ]]; then
    if [ -a src/main/docker/kafka.yml ]; then
      docker-compose -f src/main/docker/kafka.yml up -d
    fi
    if [ -a src/main/docker/mariadb.yml ]; then
      docker-compose -f src/main/docker/mariadb.yml up -d
    fi

elif [[ ("$JBOOTER" == 'app-gateway-eureka') || ("$JBOOTER" == 'app-microservice-eureka') ]]; then
    if [ -a src/main/docker/jbooter-registry.yml ]; then
        docker-compose -f src/main/docker/jbooter-registry.yml up -d
    fi

elif [[ ("$JBOOTER" == 'app-gateway-consul') || ("$JBOOTER" == 'app-microservice-consul') ]]; then
    if [ -a src/main/docker/consul.yml ]; then
        docker-compose -f src/main/docker/consul.yml up -d
    fi

elif [[ "$JBOOTER" == 'app-gateway-uaa' ]]; then
    if [ -a src/main/docker/jbooter-registry.yml ]; then
        docker-compose -f src/main/docker/jbooter-registry.yml up -d
    fi
fi

docker ps -a
