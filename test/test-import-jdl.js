/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fse = require('fs-extra');

describe('JBooter generator import jdl', function () {
    describe('imports a JDL model from single file', function () {
        beforeEach(function (done) {
            helpers.run(require.resolve('../generators/import-jdl'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, '../test/templates/import-jdl'), dir);
                })
                .withArguments(['jdl.jdl'])
                .on('end', done);
        });

        it('creates entity json files', function () {
            assert.file([
                '.jbooter/Department.json',
                '.jbooter/JobHistory.json',
                '.jbooter/Job.json',
                '.jbooter/Employee.json',
                '.jbooter/Location.json',
                '.jbooter/Task.json',
                '.jbooter/Country.json',
                '.jbooter/Region.json'
            ]);
        });
    });

    describe('imports a JDL model from multiple files', function () {
        beforeEach(function (done) {
            helpers.run(require.resolve('../generators/import-jdl'))
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, '../test/templates/import-jdl'), dir);
                })
                .withArguments(['jdl.jdl', 'jdl2.jdl'])
                .on('end', done);
        });

        it('creates entity json files', function () {
            assert.file([
                '.jbooter/Department.json',
                '.jbooter/JobHistory.json',
                '.jbooter/Job.json',
                '.jbooter/Employee.json',
                '.jbooter/Location.json',
                '.jbooter/Task.json',
                '.jbooter/Country.json',
                '.jbooter/Region.json',
                '.jbooter/DepartmentAlt.json',
                '.jbooter/JobHistoryAlt.json'
            ]);
        });
    });
});
