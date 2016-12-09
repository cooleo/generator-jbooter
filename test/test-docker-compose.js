/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fse = require('fs-extra');

const expectedFiles = {
    dockercompose : [
        'docker-compose.yml',
        'jbooter-registry.yml',
        'central-server-config/application.yml'
    ],
    elk : [
        'jbooter-console.yml',
        'log-conf/logstash.conf'
    ],
    prometheus : [
        'prometheus.yml',
        'prometheus-conf/alert.rules',
        'prometheus-conf/prometheus.yml',
        'alertmanager-conf/config.yml'
    ],
    monolith : [
        'docker-compose.yml'
    ]
};

describe('JBooter Docker Compose Sub Generator', function () {

    describe('only gateway', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'no'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
    });

    describe('only one microservice', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '02-mysql'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'no'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
    });

    describe('gateway and one microservice', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway',
                        '02-mysql'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'no'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
    });

    describe('gateway and one microservice, with elk', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway',
                        '02-mysql'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'elk'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates expected elk files', function () {
            assert.file(expectedFiles.elk);
        });
    });

    describe('gateway and one microservice, with prometheus', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway',
                        '02-mysql'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'prometheus'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates expected prometheus files', function () {
            assert.file(expectedFiles.prometheus);
        });
    });

    describe('gateway, uaa server and one microservice, with elk', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withOptions({force: true})
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway',
                        '02-mysql',
                        '06-uaa'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'elk'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates expected elk files', function () {
            assert.file(expectedFiles.elk);
        });
    });

    describe('gateway and multi microservices, with elk', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway',
                        '02-mysql',
                        '03-psql',
                        '04-mongo',
                        '07-mariadb'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'elk'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates expected elk files', function () {
            assert.file(expectedFiles.elk);
        });
    });

    describe('gateway and multi microservices, with 1 mongodb cluster', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway',
                        '02-mysql',
                        '03-psql',
                        '04-mongo'
                    ],
                    clusteredDbApps: [
                        '04-mongo'
                    ],
                    monitoring: 'elk'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates expected elk files', function () {
            assert.file(expectedFiles.elk);
        });
    });

    describe('gateway and 1 microservice, with Cassandra cluster', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'microservice',
                    directoryPath: './',
                    'chosenApps': [
                        '01-gateway',
                        '05-cassandra'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'elk'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.dockercompose);
        });
        it('creates expected elk files', function () {
            assert.file(expectedFiles.elk);
        });
    });

    describe('monolith', function () {
        beforeEach(function (done) {
            helpers
                .run(require.resolve('../generators/docker-compose'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/compose/'), dir);
                })
                .withPrompts({
                    composeApplicationType: 'monolith',
                    directoryPath: './',
                    'chosenApps': [
                        '08-monolith'
                    ],
                    clusteredDbApps: [],
                    monitoring: 'elk'
                })
                .on('end', done);
        });
        it('creates expected default files', function () {
            assert.file(expectedFiles.monolith);
        });
    });
});
