'use strict';
var S3 = require('./s3.js'),
    Rds = require('./rds.js'),
    shelljs = require('shelljs'),
    os = require('os'),
    Eb = require('./eb.js');

var Aws, generator;

var AwsFactory = module.exports = function AwsFactory(generatorRef, cb) {
    generator = generatorRef;
    try {
        Aws = require('aws-sdk');
        cb();
    } catch (e) {
        generator.log('Installing AWS dependencies into your JBooter folder');
        var jbooterPath = 'node_modules/generator-jbooter';
        var skipClient = generator.config.get('skipClient');
        // use the global JBooter for apps with no client-side code
        if (skipClient) {
            var prefix = shelljs.exec('npm config get prefix', {silent:true}).trim();
            if (os.platform() === 'win32') {
                jbooterPath = prefix + '/' + jbooterPath;
            } else {
                jbooterPath = prefix + '/lib/' + jbooterPath;
            }
        }
        shelljs.exec('npm install aws-sdk progress node-uuid --prefix ' + jbooterPath, {silent:true}, function (code, msg, err) {
            if (code !== 0) generator.error('Something went wrong while installing:\n' + err);
            Aws = require('aws-sdk');
            cb();
        });
    }
};

AwsFactory.prototype.init = function initAws(options) {
    Aws.config.region = options.region;
};

AwsFactory.prototype.getS3 = function getS3() {
    return new S3(Aws, generator);
};

AwsFactory.prototype.getRds = function getRds() {
    return new Rds(Aws, generator);
};

AwsFactory.prototype.getEb = function getEb() {
    return new Eb(Aws, generator);
};
