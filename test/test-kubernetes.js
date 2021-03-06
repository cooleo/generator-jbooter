/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fse = require('fs-extra');

const expectedFiles = {
    registry : [
        'registry/jbooter-registry.yml'
    ],
    jhgate : [
        'jhgate/jhgate-deployment.yml',
        'jhgate/jhgate-mysql.yml',
        'jhgate/jhgate-service.yml'
    ],
    msmysql : [
        'msmysql/msmysql-deployment.yml',
        'msmysql/msmysql-mysql.yml',
        'msmysql/msmysql-service.yml'
    ],
    mspsql : [
        'mspsql/mspsql-deployment.yml',
        'mspsql/mspsql-postgresql.yml',
        'mspsql/mspsql-service.yml',
        'mspsql/mspsql-elasticsearch.yml'
    ],
    msmongodb : [
        'msmongodb/msmongodb-deployment.yml',
        'msmongodb/msmongodb-mongodb.yml',
        'msmongodb/msmongodb-service.yml'
    ],
    msmariadb : [
        'msmariadb/msmariadb-deployment.yml',
        'msmariadb/msmariadb-mariadb.yml',
        'msmariadb/msmariadb-service.yml'
    ],
    monolith : [
        'samplemysql/samplemysql-deployment.yml',
        'samplemysql/samplemysql-mysql.yml',
        'samplemysql/samplemysql-service.yml',
        'samplemysql/samplemysql-elasticsearch.yml'
    ],
    kafka : [
        'samplekafka/samplekafka-deployment.yml',
        'samplekafka/samplekafka-mysql.yml',
        'samplekafka/samplekafka-service.yml',
        'samplekafka/samplekafka-kafka.yml'
    ],
};

describe('JBooter Kubernetes Sub Generator', function () {
    describe('only gateway', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/kubernetes'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withOptions({checkInstall: false})
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    chosenApps: [
                        '01-gateway'
                    ],
                    adminPassword: 'meetup',
                    dockerRepositoryName: 'jbooterrepository',
                    dockerPushCommand: 'docker push',
                    kubernetesNamespace: 'jbooternamespace'
                })
                .on('end', done);
        });
        it('creates expected registry files and content', function () {
            assert.file(expectedFiles.registry);
            assert.fileContent('registry/jbooter-registry.yml', /http:\/\/admin:meetup/);
        });
        it('creates expected gateway files and content', function () {
            assert.file(expectedFiles.jhgate);
            assert.fileContent('jhgate/jhgate-deployment.yml', /image: jbooterrepository\/jhgate/);
            assert.fileContent('jhgate/jhgate-deployment.yml', /jbooternamespace.svc.cluster/);
        });
    });

    describe('gateway and mysql microservice', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/kubernetes'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withOptions({checkInstall: false})
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    chosenApps: [
                        '01-gateway',
                        '02-mysql'
                    ],
                    dockerRepositoryName: 'jbooter',
                    dockerPushCommand: 'docker push',
                    kubernetesNamespace: 'default'
                })
                .on('end', done);
        });
        it('creates expected registry files', function () {
            assert.file(expectedFiles.registry);
        });
        it('creates expected gateway files', function () {
            assert.file(expectedFiles.jhgate);
        });
        it('creates expected mysql files', function () {
            assert.file(expectedFiles.msmysql);
        });
    });

    describe('mysql and psql microservices without gateway', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/kubernetes'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withOptions({checkInstall: false})
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    chosenApps: [
                        '02-mysql',
                        '03-psql'
                    ],
                    dockerRepositoryName: 'jbooter',
                    dockerPushCommand: 'docker push',
                    kubernetesNamespace: 'default'
                })
                .on('end', done);
        });
        it('creates expected registry files', function () {
            assert.file(expectedFiles.registry);
        });
        it('doesn\'t creates gateway files', function () {
            assert.noFile(expectedFiles.jhgate);
        });
        it('creates expected mysql files', function () {
            assert.file(expectedFiles.msmysql);
        });
        it('creates expected psql files', function () {
            assert.file(expectedFiles.mspsql);
        });
    });

    describe('gateway, mysql, psql, mongodb, mariadb microservices', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/kubernetes'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withOptions({checkInstall: false})
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    chosenApps: [
                        '01-gateway',
                        '02-mysql',
                        '03-psql',
                        '04-mongo',
                        '07-mariadb'
                    ],
                    dockerRepositoryName: 'jbooter',
                    dockerPushCommand: 'docker push',
                    kubernetesNamespace: 'default'
                })
                .on('end', done);
        });
        it('creates expected registry files', function () {
            assert.file(expectedFiles.registry);
        });
        it('creates expected gateway files', function () {
            assert.file(expectedFiles.jhgate);
        });
        it('creates expected mysql files', function () {
            assert.file(expectedFiles.msmysql);
        });
        it('creates expected psql files', function () {
            assert.file(expectedFiles.mspsql);
        });
        it('creates expected mongodb files', function () {
            assert.file(expectedFiles.msmongodb);
        });
        it('creates expected mariadb files', function () {
            assert.file(expectedFiles.msmariadb);
        });
    });

    describe('monolith application', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/kubernetes'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withOptions({checkInstall: false})
                .withPrompts({
                    composeApplicationType: 'monolith',
                    directoryPath: './',
                    chosenApps: [
                        '08-monolith'
                    ],
                    dockerRepositoryName: 'jbooter',
                    dockerPushCommand: 'docker push',
                    kubernetesNamespace: 'default'
                })
                .on('end', done);
        });
        it('doesn\'t creates registry files', function () {
            assert.noFile(expectedFiles.registry);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.monolith);
        });
    });

    describe('kafka application', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/kubernetes'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withOptions({checkInstall: false})
                .withPrompts({
                    composeApplicationType: 'monolith',
                    directoryPath: './',
                    chosenApps: [
                        '09-kafka'
                    ],
                    dockerRepositoryName: 'jbooter',
                    dockerPushCommand: 'docker push',
                    kubernetesNamespace: 'default'
                })
                .on('end', done);
        });
        it('doesn\'t creates registry files', function () {
            assert.noFile(expectedFiles.registry);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.kafka);
        });
    });

});
