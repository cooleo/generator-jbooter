'use strict';
var util = require('util'),
    generators = require('yeoman-generator'),
    _ = require('lodash'),
    chalk = require('chalk'),
    scriptBase = require('../generator-base');

const constants = require('../generator-constants');

var ModulesGenerator = generators.Base.extend({});

util.inherits(ModulesGenerator, scriptBase);

module.exports = ModulesGenerator.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

        var jbooterVar = this.options.jbooterVar;
        var jbooterFunc = this.options.jbooterFunc;
        if (jbooterVar === undefined || jbooterVar.moduleName === undefined) {
            this.error(chalk.red('This sub-generator must be used by JBooter modules, and the module name is not defined.'));
        }

        this.log('Composing JBooter configuration with module ' + chalk.red(jbooterVar.moduleName));

        var baseName = this.config.get('baseName');
        var packageName = this.config.get('packageName');
        var packageFolder = this.config.get('packageFolder');

        if (!this.options.skipValidation && (baseName === undefined || packageName === undefined)) {
            this.log(chalk.red('ERROR! There is no existing JBooter configuration file in this directory.'));
            this.error('JBooter ' + jbooterVar.moduleName + ' is a JBooter module, and needs a .yo-rc.json configuration file made by JBooter.');
        }
        // add required JBooter variables
        jbooterVar.baseName = this.baseName = baseName;
        jbooterVar.packageName = packageName;
        jbooterVar.packageFolder = packageFolder;

        jbooterVar.jbooterConfig = this.config.getAll();
        jbooterVar.applicationType = this.config.get('applicationType');
        jbooterVar.authenticationType = this.config.get('authenticationType');
        jbooterVar.hibernateCache = this.config.get('hibernateCache');
        jbooterVar.clusteredHttpSession = this.config.get('clusteredHttpSession');
        jbooterVar.websocket = this.config.get('websocket');
        jbooterVar.databaseType = this.config.get('databaseType');
        jbooterVar.devDatabaseType = this.config.get('devDatabaseType');
        jbooterVar.prodDatabaseType = this.config.get('prodDatabaseType');
        jbooterVar.searchEngine = this.config.get('searchEngine');
        jbooterVar.useSass = this.config.get('useSass');
        jbooterVar.buildTool = this.config.get('buildTool');
        jbooterVar.enableTranslation = this.config.get('enableTranslation');
        jbooterVar.nativeLanguage = this.config.get('nativeLanguage');
        jbooterVar.languages = this.config.get('languages');
        jbooterVar.enableSocialSignIn = this.config.get('enableSocialSignIn');
        jbooterVar.testFrameworks = this.config.get('testFrameworks');
        jbooterVar.jhiPrefix = this.config.get('jhiPrefix');
        jbooterVar.jhiPrefixCapitalized = _.upperFirst(jbooterVar.jhiPrefix);
        jbooterVar.jbooterVersion = this.config.get('jbooterVersion');
        jbooterVar.serverPort = this.config.get('serverPort');

        jbooterVar.angularAppName = this.getAngularAppName();
        jbooterVar.mainClassName = this.getMainClassName();
        jbooterVar.javaDir = constants.SERVER_MAIN_SRC_DIR + packageFolder + '/';
        jbooterVar.resourceDir = constants.SERVER_MAIN_RES_DIR;
        jbooterVar.webappDir = constants.CLIENT_MAIN_SRC_DIR;
        jbooterVar.CONSTANTS = constants;

        // alias fs and log methods so that we can use it in script-base when invoking functions from jbooterFunc context in modules
        jbooterFunc.fs = this.fs;
        jbooterFunc.log = this.log;

        //add common methods from script-base.js
        jbooterFunc.addSocialButton = this.addSocialButton;
        jbooterFunc.addSocialConnectionFactory = this.addSocialConnectionFactory;
        jbooterFunc.addMavenDependency = this.addMavenDependency;
        jbooterFunc.addMavenPlugin = this.addMavenPlugin;
        jbooterFunc.addGradlePlugin = this.addGradlePlugin;
        jbooterFunc.addGradleDependency = this.addGradleDependency;
        jbooterFunc.addSocialConfiguration = this.addSocialConfiguration;
        jbooterFunc.applyFromGradleScript = this.applyFromGradleScript;
        jbooterFunc.addBowerrcParameter = this.addBowerrcParameter;
        jbooterFunc.addBowerDependency = this.addBowerDependency;
        jbooterFunc.addBowerOverride = this.addBowerOverride;
        jbooterFunc.addMainCSSStyle = this.addMainCSSStyle;
        jbooterFunc.addMainSCSSStyle = this.addMainSCSSStyle;
        jbooterFunc.addAngularJsModule = this.addAngularJsModule;
        jbooterFunc.addAngularJsInterceptor = this.addAngularJsInterceptor;
        jbooterFunc.addElementToMenu = this.addElementToMenu;
        jbooterFunc.addElementToAdminMenu = this.addElementToAdminMenu;
        jbooterFunc.addEntityToMenu = this.addEntityToMenu;
        jbooterFunc.addElementTranslationKey = this.addElementTranslationKey;
        jbooterFunc.addAdminElementTranslationKey = this.addAdminElementTranslationKey;
        jbooterFunc.addGlobalTranslationKey = this.addGlobalTranslationKey;
        jbooterFunc.addTranslationKeyToAllLanguages = this.addTranslationKeyToAllLanguages;
        jbooterFunc.getAllSupportedLanguages = this.getAllSupportedLanguages;
        jbooterFunc.getAllSupportedLanguageOptions = this.getAllSupportedLanguageOptions;
        jbooterFunc.isSupportedLanguage = this.isSupportedLanguage;
        jbooterFunc.getAllInstalledLanguages = this.getAllInstalledLanguages;
        jbooterFunc.addEntityTranslationKey = this.addEntityTranslationKey;
        jbooterFunc.addEntityToEhcache = this.addEntityToEhcache;
        jbooterFunc.addEntryToEhcache = this.addEntryToEhcache;
        jbooterFunc.addChangelogToLiquibase = this.addChangelogToLiquibase;
        jbooterFunc.addConstraintsChangelogToLiquibase = this.addConstraintsChangelogToLiquibase;
        jbooterFunc.addLiquibaseChangelogToMaster = this.addLiquibaseChangelogToMaster;
        jbooterFunc.addColumnToLiquibaseEntityChangeset = this.addColumnToLiquibaseEntityChangeset;
        jbooterFunc.dateFormatForLiquibase = this.dateFormatForLiquibase;
        jbooterFunc.copyI18nFilesByName = this.copyI18nFilesByName;
        jbooterFunc.copyTemplate = this.copyTemplate;
        jbooterFunc.copyHtml = this.copyHtml;
        jbooterFunc.copyJs = this.copyJs;
        jbooterFunc.rewriteFile = this.rewriteFile;
        jbooterFunc.replaceContent = this.replaceContent;
        jbooterFunc.registerModule = this.registerModule;
        jbooterFunc.updateEntityConfig = this.updateEntityConfig;
        jbooterFunc.getModuleHooks = this.getModuleHooks;
        jbooterFunc.getExistingEntities = this.getExistingEntities;
        jbooterFunc.isJbooterVersionLessThan = this.isJbooterVersionLessThan;
        jbooterFunc.getTableName = this.getTableName;
        jbooterFunc.getColumnName = this.getColumnName;
        jbooterFunc.getPluralColumnName = this.getPluralColumnName;
        jbooterFunc.getJoinTableName = this.getJoinTableName;
        jbooterFunc.getConstraintName = this.getConstraintName;
        jbooterFunc.error = this.error;
        jbooterFunc.warning = this.warning;
        jbooterFunc.printJBooterLogo = this.printJBooterLogo;
        jbooterFunc.checkForNewVersion = this.checkForNewVersion;
        jbooterFunc.getAngularAppName = this.getAngularAppName;
        jbooterFunc.getMainClassName = this.getMainClassName;
        jbooterFunc.askModuleName = this.askModuleName;
        jbooterFunc.aski18n = this.aski18n;
        jbooterFunc.composeLanguagesSub = this.composeLanguagesSub;
        jbooterFunc.getNumberedQuestion = this.getNumberedQuestion;
        jbooterFunc.buildApplication = this.buildApplication;

    },

    initializing: function () {
        var insight = this.insight();
        insight.trackWithEvent('generator', 'modules');

        this.log('Reading the JBooter project configuration for your module');
    }
});
