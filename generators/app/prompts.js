'use strict';

var chalk = require('chalk');


module.exports = {
    askForInsightOptIn,
    askForApplicationType,
    askForModuleName,
    askFori18n,
    askForTestOpts,
    askForMoreModules
};

function askForInsightOptIn() {
    if (this.existingProject) return;

    var done = this.async();
    var insight = this.insight();

    this.prompt({
        when: function () {
            return insight.optOut === undefined;
        },
        type: 'confirm',
        name: 'insight',
        message: 'May ' + chalk.cyan('JBooter') + ' anonymously report usage statistics to improve the tool over time?',
        default: true
    }).then(function (prompt) {
        if (prompt.insight !== undefined) {
            insight.optOut = !prompt.insight;
        }
        done();
    }.bind(this));
}

function askForApplicationType() {
    if (this.existingProject) return;

    const DEFAULT_APPTYPE = 'monolith';
    if (this.skipServer) {
        this.applicationType = this.configOptions.applicationType = DEFAULT_APPTYPE;
        return;
    }

    var done = this.async();
    var getNumberedQuestion = this.getNumberedQuestion.bind(this);

    this.prompt({
        type: 'list',
        name: 'applicationType',
        message: function (response) {
            return getNumberedQuestion('Which *type* of application would you like to create?', true);
        },
        choices: [
            {
                value: DEFAULT_APPTYPE,
                name: 'Monolithic application (recommended for simple projects)'
            },
            {
                value: 'microservice',
                name: 'Microservice application'
            },
            {
                value: 'gateway',
                name: 'Microservice gateway'
            },
            {
                value: 'uaa',
                name: '[BETA] JBooter UAA server (for microservice OAuth2 authentication)'
            }
        ],
        default: DEFAULT_APPTYPE
    }).then(function (prompt) {
        this.applicationType = this.configOptions.applicationType = prompt.applicationType;
        done();
    }.bind(this));
}

function askForModuleName() {
    if (this.existingProject) return;

    this.askModuleName(this);
    this.configOptions.lastQuestion = this.currentQuestion;
    this.configOptions.totalQuestions = this.totalQuestions;
}

function askFori18n() {
    this.currentQuestion = this.configOptions.lastQuestion;
    this.totalQuestions = this.configOptions.totalQuestions;
    if (this.skipI18n || this.existingProject) return;
    this.aski18n(this);
}

function askForTestOpts() {
    if (this.existingProject) return;

    var getNumberedQuestion = this.getNumberedQuestion.bind(this);
    var choices = [];
    var defaultChoice = [];
    if (!this.skipServer) {
        // all server side test frameworks should be added here
        choices.push(
            {name: 'Gatling', value: 'gatling'},
            {name: 'Cucumber', value: 'cucumber'}
        );
        defaultChoice = ['gatling'];
    }
    if (!this.skipClient) {
        // all client side test frameworks should be added here
        choices.push(
            {name: 'Protractor', value: 'protractor'}
        );
    }
    var done = this.async();

    this.prompt({
        type: 'checkbox',
        name: 'testFrameworks',
        message: function (response) {
            return getNumberedQuestion('Which testing frameworks would you like to use?', true);
        },
        choices: choices,
        default: defaultChoice
    }).then(function (prompt) {
        this.testFrameworks = prompt.testFrameworks;
        done();
    }.bind(this));
}

function askModulesToBeInstalled(done, generator) {
    generator.httpGet('http://npmsearch.com/query?fields=name,description,author,version&q=keywords:jbooter-module&start=0&size=50',
        function(body) {
            var moduleResponse = JSON.parse(body);
            var choices = [];
            moduleResponse.results.forEach(function (modDef) {
                choices.push({
                    value: { name:modDef.name, version:modDef.version},
                    name: '(' + modDef.name + '-' + modDef.version + ') '+ modDef.description + ' [' + modDef.author + ']'
                });
            });
            if (choices.length > 0) {
                generator.prompt({
                    type: 'checkbox',
                    name: 'otherModules',
                    message: 'Which other modules would you like to use?',
                    choices: choices,
                    default: []
                }).then(function (prompt) {
                    // [ {name: [moduleName], version:[version]}, ...]
                    generator.otherModules = [];
                    prompt.otherModules.forEach(function(module) {
                        generator.otherModules.push({name:module.name[0], version:module.version[0]});
                    });
                    generator.configOptions.otherModules = this.otherModules;
                    done();
                }.bind(generator));
            } else {
                done();
            }
        },
        function (error) {
            generator.warning(`Unable to contact server to fetch additional modules: ${ error.message }'`);
            done();
        });
}

function askForMoreModules() {
    if (this.existingProject) {
        return;
    }

    var done = this.async();
    var generator = this;
    this.prompt({
        type: 'confirm',
        name: 'installModules',
        message: function(response) {
            return generator.getNumberedQuestion('Would you like to install other generators from the JBooter Market Place?', true);
        },
        default: false
    }).then(function (prompt) {
        if (prompt.installModules) {
            askModulesToBeInstalled(done, generator);
        } else {
            done();
        }
    }.bind(this));
}
