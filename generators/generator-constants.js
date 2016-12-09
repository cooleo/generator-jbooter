'use strict';

// version of docker images
const DOCKER_JBOOTER_REGISTRY = 'jbooter/jbooter-registry:v2.5.5';
const DOCKER_JAVA_JRE = 'openjdk:8-jre-alpine';
const DOCKER_MYSQL = 'mysql:5.7.13'; // mysql.5.7.14+ doesn't work well with zoned date time, see https://github.com/jbooter/generator-jbooter/pull/4038
const DOCKER_MARIADB = 'mariadb:10.1.17';
const DOCKER_POSTGRESQL = 'postgres:9.5.4';
const DOCKER_MONGODB = 'mongo:3.2.10';
const DOCKER_CASSANDRA = 'cassandra:3.9';
const DOCKER_MSSQL = 'microsoft/mssql-server-linux:latest';
const DOCKER_ELASTICSEARCH = 'elasticsearch:2.4.1';
const DOCKER_KAFKA = 'wurstmeister/kafka:0.10.0.1';
const DOCKER_ZOOKEEPER = 'wurstmeister/zookeeper:3.4.6';
const DOCKER_SONAR = 'sonarqube:6.1-alpine';
const DOCKER_JBOOTER_CONSOLE = 'jbooter/jbooter-console:v1.3.2';
const DOCKER_JBOOTER_ELASTICSEARCH = 'jbooter/jbooter-elasticsearch:v1.3.2';
const DOCKER_JBOOTER_LOGSTASH = 'jbooter/jbooter-logstash:v1.3.2';
const DOCKER_CONSUL = 'consul:0.7.1';
const DOCKER_CONSUL_CONFIG_LOADER = 'jbooter/consul-config-loader:v0.1.2';
const DOCKER_PROMETHEUS = 'prom/prometheus:v1.4.1';
const DOCKER_PROMETHEUS_ALERTMANAGER = 'prom/alertmanager:v0.5.1';
const DOCKER_GRAFANA = 'grafana/grafana:4.0.0';

// all constants used throughout all generators

const MAIN_DIR = 'src/main/';
const TEST_DIR = 'src/test/';

// Note: this will be prepended with 'target/' for Maven, or with 'build/' for Gradle.
const CLIENT_DIST_DIR = 'www/';

const SUPPORTED_VALIDATION_RULES = ['required', 'max', 'min', 'maxlength', 'minlength', 'maxbytes', 'minbytes', 'pattern'];

// documentation constants
const JBOOTER_DOCUMENTATION_URL = 'https://jbooter.github.io';
const JBOOTER_DOCUMENTATION_ARCHIVE_PATH = '/documentation-archive/';

const constants = {
    QUESTIONS: 14, // maximum possible number of questions
    CLIENT_QUESTIONS: 4,
    SERVER_QUESTIONS: 10,
    INTERPOLATE_REGEX: /<%:([\s\S]+?)%>/g, // so that tags in templates do not get mistreated as _ templates
    DOCKER_DIR: MAIN_DIR + 'docker/',

    MAIN_DIR: MAIN_DIR,
    TEST_DIR: TEST_DIR,

    CLIENT_MAIN_SRC_DIR: MAIN_DIR + 'webapp/',
    CLIENT_TEST_SRC_DIR: TEST_DIR + 'javascript/',
    CLIENT_DIST_DIR: CLIENT_DIST_DIR,
    ANGULAR_DIR: MAIN_DIR + 'webapp/app/',

    SERVER_MAIN_SRC_DIR: MAIN_DIR + 'java/',
    SERVER_MAIN_RES_DIR: MAIN_DIR + 'resources/',
    SERVER_TEST_SRC_DIR: TEST_DIR + 'java/',
    SERVER_TEST_RES_DIR: TEST_DIR + 'resources/',

    //entity related
    SUPPORTED_VALIDATION_RULES: SUPPORTED_VALIDATION_RULES,

    JBOOTER_DOCUMENTATION_URL: JBOOTER_DOCUMENTATION_URL,
    JBOOTER_DOCUMENTATION_ARCHIVE_PATH: JBOOTER_DOCUMENTATION_ARCHIVE_PATH,

    DOCKER_JBOOTER_REGISTRY: DOCKER_JBOOTER_REGISTRY,
    DOCKER_JAVA_JRE: DOCKER_JAVA_JRE,
    DOCKER_MYSQL: DOCKER_MYSQL,
    DOCKER_MARIADB: DOCKER_MARIADB,
    DOCKER_POSTGRESQL: DOCKER_POSTGRESQL,
    DOCKER_MONGODB: DOCKER_MONGODB,
    DOCKER_CASSANDRA: DOCKER_CASSANDRA,
    DOCKER_MSSQL: DOCKER_MSSQL,
    DOCKER_ELASTICSEARCH: DOCKER_ELASTICSEARCH,
    DOCKER_KAFKA: DOCKER_KAFKA,
    DOCKER_ZOOKEEPER: DOCKER_ZOOKEEPER,
    DOCKER_SONAR: DOCKER_SONAR,
    DOCKER_JBOOTER_CONSOLE: DOCKER_JBOOTER_CONSOLE,
    DOCKER_JBOOTER_ELASTICSEARCH: DOCKER_JBOOTER_ELASTICSEARCH,
    DOCKER_JBOOTER_LOGSTASH: DOCKER_JBOOTER_LOGSTASH,
    DOCKER_CONSUL: DOCKER_CONSUL,
    DOCKER_CONSUL_CONFIG_LOADER: DOCKER_CONSUL_CONFIG_LOADER,
    DOCKER_PROMETHEUS: DOCKER_PROMETHEUS,
    DOCKER_PROMETHEUS_ALERTMANAGER: DOCKER_PROMETHEUS_ALERTMANAGER,
    DOCKER_GRAFANA: DOCKER_GRAFANA
};


module.exports = constants;
