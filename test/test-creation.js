/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fse = require('fs-extra');

const constants = require('../generators/generator-constants'),
    TEST_DIR = constants.TEST_DIR,
    CLIENT_MAIN_SRC_DIR = constants.CLIENT_MAIN_SRC_DIR,
    CLIENT_TEST_SRC_DIR = constants.CLIENT_TEST_SRC_DIR,
    SERVER_MAIN_SRC_DIR = constants.SERVER_MAIN_SRC_DIR,
    SERVER_MAIN_RES_DIR = constants.SERVER_MAIN_RES_DIR,
    SERVER_TEST_SRC_DIR = constants.SERVER_TEST_SRC_DIR,
    SERVER_TEST_RES_DIR = constants.SERVER_TEST_RES_DIR,
    DOCKER_DIR = constants.DOCKER_DIR;

const expectedFiles = {

    gradle : [
        'gradle.properties',
        'build.gradle',
        'settings.gradle',
        'gradlew',
        'gradlew.bat',
        'gradle/docker.gradle',
        'gradle/gatling.gradle',
        'gradle/liquibase.gradle',
        'gradle/mapstruct.gradle',
        'gradle/profile_dev.gradle',
        'gradle/profile_prod.gradle',
        'gradle/sonar.gradle',
        'gradle/wrapper/gradle-wrapper.jar',
        'gradle/wrapper/gradle-wrapper.properties'
    ],

    maven : [
        'pom.xml',
        'mvnw',
        'mvnw.cmd',
        '.mvn/wrapper/maven-wrapper.jar',
        '.mvn/wrapper/maven-wrapper.properties'
    ],

    server: [
        'README.md',
        '.gitignore',
        '.gitattributes',
        'Jenkinsfile',
        '.travis.yml',
        SERVER_MAIN_RES_DIR + 'banner.txt',
        SERVER_MAIN_RES_DIR + 'ehcache.xml',
        SERVER_MAIN_RES_DIR + '.h2.server.properties',
        SERVER_MAIN_RES_DIR + 'templates/error.html',
        SERVER_MAIN_RES_DIR + 'logback-spring.xml',
        SERVER_MAIN_RES_DIR + 'config/application.yml',
        SERVER_MAIN_RES_DIR + 'config/application-dev.yml',
        SERVER_MAIN_RES_DIR + 'config/application-prod.yml',
        SERVER_MAIN_RES_DIR + 'config/liquibase/changelog/00000000000000_initial_schema.xml',
        SERVER_MAIN_RES_DIR + 'config/liquibase/master.xml',
        SERVER_MAIN_RES_DIR + 'config/liquibase/users.csv',
        SERVER_MAIN_RES_DIR + 'config/liquibase/authorities.csv',
        SERVER_MAIN_RES_DIR + 'config/liquibase/users_authorities.csv',
        SERVER_MAIN_RES_DIR + 'mails/activationEmail.html',
        SERVER_MAIN_RES_DIR + 'mails/passwordResetEmail.html',
        SERVER_MAIN_RES_DIR + 'i18n/messages.properties',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/JbooterApp.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/ApplicationWebXml.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/aop/logging/LoggingAspect.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/apidoc/package-info.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/apidoc/SwaggerConfiguration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/apidoc/PageableParameterBuilderPlugin.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/async/package-info.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/async/ExceptionHandlingAsyncTaskExecutor.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/package-info.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/AsyncConfiguration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/CacheConfiguration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/Constants.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/CloudDatabaseConfiguration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/DatabaseConfiguration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/DateTimeFormatConfiguration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/LocaleConfiguration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/LoggingAspectConfiguration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/MetricsConfiguration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/SecurityConfiguration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/ThymeleafConfiguration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/WebConfigurer.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/audit/package-info.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/audit/AuditEventConverter.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/locale/package-info.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/locale/AngularCookieLocaleResolver.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/domain/package-info.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/domain/AbstractAuditingEntity.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/domain/Authority.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/domain/PersistentAuditEvent.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/domain/PersistentToken.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/domain/User.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/domain/util/JSR310DateConverters.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/repository/package-info.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/repository/AuthorityRepository.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/repository/CustomAuditEventRepository.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/repository/PersistenceAuditEventRepository.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/repository/UserRepository.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/repository/PersistentTokenRepository.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/package-info.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/AjaxAuthenticationFailureHandler.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/AjaxAuthenticationSuccessHandler.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/AjaxLogoutSuccessHandler.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/AuthoritiesConstants.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/CustomPersistentRememberMeServices.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/Http401UnauthorizedEntryPoint.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/SecurityUtils.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/SpringSecurityAuditorAware.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/UserDetailsService.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/UserNotActivatedException.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/service/package-info.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/service/AuditEventService.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/service/UserService.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/service/MailService.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/service/util/RandomUtil.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/service/dto/package-info.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/service/dto/UserDTO.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/service/mapper/package-info.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/service/mapper/UserMapper.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/filter/package-info.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/filter/CachingHttpHeadersFilter.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/rest/vm/package-info.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/rest/vm/KeyAndPasswordVM.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/rest/vm/LoggerVM.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/rest/vm/ManagedUserVM.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/rest/vm/LoggerVM.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/rest/util/PaginationUtil.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/rest/package-info.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/rest/AccountResource.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/rest/AuditResource.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/rest/LogsResource.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/rest/UserResource.java',
        SERVER_TEST_SRC_DIR + 'com/mycompany/myapp/security/SecurityUtilsUnitTest.java',
        SERVER_TEST_SRC_DIR + 'com/mycompany/myapp/service/UserServiceIntTest.java',
        SERVER_TEST_SRC_DIR + 'com/mycompany/myapp/web/rest/AccountResourceIntTest.java',
        SERVER_TEST_SRC_DIR + 'com/mycompany/myapp/web/rest/AuditResourceIntTest.java',
        SERVER_TEST_SRC_DIR + 'com/mycompany/myapp/web/rest/TestUtil.java',
        SERVER_TEST_SRC_DIR + 'com/mycompany/myapp/web/rest/UserResourceIntTest.java',
        SERVER_TEST_RES_DIR + 'config/application.yml',
        SERVER_TEST_RES_DIR + 'logback-test.xml',
        SERVER_TEST_RES_DIR + 'ehcache.xml',
        TEST_DIR + 'gatling/conf/gatling.conf',
        '.editorconfig'
    ],

    client: [
        'bower.json',
        'package.json',
        '.bowerrc',
        '.eslintrc.json',
        '.eslintignore',
        'gulpfile.js',
        'gulp/build.js',
        'gulp/config.js',
        'gulp/serve.js',
        'gulp/utils.js',
        'gulp/handle-errors.js',
        CLIENT_MAIN_SRC_DIR + 'content/css/main.css',
        CLIENT_MAIN_SRC_DIR + 'favicon.ico',
        CLIENT_MAIN_SRC_DIR + 'robots.txt',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/activate.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/audits.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/configuration.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/error.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/gateway.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/global.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/health.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/login.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/logs.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/home.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/metrics.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/password.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/register.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/sessions.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/settings.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/reset.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/user-management.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/activate.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/audits.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/configuration.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/error.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/global.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/gateway.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/health.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/login.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/logs.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/home.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/metrics.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/password.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/register.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/sessions.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/settings.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/reset.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/user-management.json',
        CLIENT_MAIN_SRC_DIR + 'app/app.module.js',
        CLIENT_MAIN_SRC_DIR + 'app/app.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/app.constants.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/config/http.config.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/config/localstorage.config.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/config/alert.config.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/config/translation.config.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/config/translation-storage.provider.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/config/compile.config.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/config/uib-pager.config.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/config/uib-pagination.config.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/handlers/state.handler.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/handlers/translation.handler.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/interceptor/auth-expired.interceptor.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/interceptor/errorhandler.interceptor.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/interceptor/notification.interceptor.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/audits/audits.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/configuration/configuration.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/logs/logs.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/metrics/metrics.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/health/health.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/services/auth/auth.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/services/auth/principal.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/services/auth/has-authority.directive.js',
        CLIENT_MAIN_SRC_DIR + 'app/services/auth/has-any-authority.directive.js',
        CLIENT_MAIN_SRC_DIR + 'app/services/auth/auth.session.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/services/auth/account.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/services/auth/activate.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/services/auth/password.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/services/auth/password-reset-init.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/services/auth/password-reset-finish.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/services/auth/register.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/services/auth/sessions.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/form/show-validation.directive.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/language/language.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/language/language.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/language/language.filter.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/language/language.constants.js',
        CLIENT_MAIN_SRC_DIR + 'app/layouts/navbar/navbar.html',
        CLIENT_MAIN_SRC_DIR + 'app/layouts/navbar/navbar.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/services/user/user.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/util/base64.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/util/parse-links.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/util/truncate-characters.filter.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/util/truncate-words.filter.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/util/date-util.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/util/sort.directive.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/util/sort-by.directive.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/account.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/activate/activate.html',
        CLIENT_MAIN_SRC_DIR + 'app/account/activate/activate.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/activate/activate.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/login/login.html',
        CLIENT_MAIN_SRC_DIR + 'app/components/login/login.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/login/login.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/password/password.html',
        CLIENT_MAIN_SRC_DIR + 'app/account/password/password.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/password/password.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/password/password-strength-bar.directive.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/register/register.html',
        CLIENT_MAIN_SRC_DIR + 'app/account/register/register.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/register/register.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/reset/request/reset.request.html',
        CLIENT_MAIN_SRC_DIR + 'app/account/reset/request/reset.request.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/reset/request/reset.request.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/reset/finish/reset.finish.html',
        CLIENT_MAIN_SRC_DIR + 'app/account/reset/finish/reset.finish.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/reset/finish/reset.finish.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/sessions/sessions.html',
        CLIENT_MAIN_SRC_DIR + 'app/account/sessions/sessions.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/sessions/sessions.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/settings/settings.html',
        CLIENT_MAIN_SRC_DIR + 'app/account/settings/settings.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/account/settings/settings.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/admin.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/audits/audits.html',
        CLIENT_MAIN_SRC_DIR + 'app/admin/audits/audits.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/audits/audits.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/configuration/configuration.html',
        CLIENT_MAIN_SRC_DIR + 'app/admin/configuration/configuration.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/configuration/configuration.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/docs/docs.html',
        CLIENT_MAIN_SRC_DIR + 'app/admin/docs/docs.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/health/health.html',
        CLIENT_MAIN_SRC_DIR + 'app/admin/health/health.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/health/health.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/logs/logs.html',
        CLIENT_MAIN_SRC_DIR + 'app/admin/logs/logs.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/logs/logs.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/metrics/metrics.html',
        CLIENT_MAIN_SRC_DIR + 'app/admin/metrics/metrics.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/metrics/metrics.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/layouts/error/error.html',
        CLIENT_MAIN_SRC_DIR + 'app/layouts/error/accessdenied.html',
        CLIENT_MAIN_SRC_DIR + 'app/entities/entity.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/layouts/error/error.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/home/home.html',
        CLIENT_MAIN_SRC_DIR + 'app/home/home.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/home/home.controller.js',
        CLIENT_TEST_SRC_DIR + 'karma.conf.js',
        CLIENT_TEST_SRC_DIR + 'spec/helpers/httpBackend.js',
        CLIENT_TEST_SRC_DIR + 'spec/helpers/module.js',
        CLIENT_TEST_SRC_DIR + 'spec/app/admin/health/health.controller.spec.js',
        CLIENT_TEST_SRC_DIR + 'spec/app/components/login/login.controller.spec.js',
        CLIENT_TEST_SRC_DIR + 'spec/app/account/password/password.controller.spec.js',
        CLIENT_TEST_SRC_DIR + 'spec/app/account/password/password-strength-bar.directive.spec.js',
        CLIENT_TEST_SRC_DIR + 'spec/app/account/sessions/sessions.controller.spec.js',
        CLIENT_TEST_SRC_DIR + 'spec/app/account/settings/settings.controller.spec.js',
        CLIENT_TEST_SRC_DIR + 'spec/app/account/activate/activate.controller.spec.js',
        CLIENT_TEST_SRC_DIR + 'spec/app/account/register/register.controller.spec.js',
        CLIENT_TEST_SRC_DIR + 'spec/app/account/reset/finish/reset.finish.controller.spec.js',
        CLIENT_TEST_SRC_DIR + 'spec/app/account/reset/request/reset.request.controller.spec.js',
        CLIENT_TEST_SRC_DIR + 'spec/app/services/auth/auth.services.spec.js',
        CLIENT_MAIN_SRC_DIR + 'content/css/documentation.css',
        CLIENT_MAIN_SRC_DIR + 'content/images/hipster.png',
        CLIENT_MAIN_SRC_DIR + 'content/images/hipster2x.png'
    ],

    i18n: [
        SERVER_MAIN_RES_DIR + 'i18n/messages_en.properties',
        SERVER_MAIN_RES_DIR + 'i18n/messages_fr.properties',
        CLIENT_MAIN_SRC_DIR + 'i18n/en/global.json',
        CLIENT_MAIN_SRC_DIR + 'i18n/fr/global.json',
        CLIENT_MAIN_SRC_DIR + 'app/components/language/language.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/language/language.service.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/language/language.filter.js',
        CLIENT_MAIN_SRC_DIR + 'app/components/language/language.constants.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/config/translation.config.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/config/translation-storage.provider.js',
        CLIENT_MAIN_SRC_DIR + 'app/blocks/handlers/translation.handler.js'
    ],

    socialLogin: [
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/social/SocialConfiguration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/domain/SocialUserConnection.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/repository/CustomSocialConnectionRepository.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/repository/CustomSocialUsersConnectionRepository.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/repository/SocialUserConnectionRepository.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/social/CustomSignInAdapter.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/service/SocialService.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/rest/SocialController.java',
        SERVER_TEST_SRC_DIR + 'com/mycompany/myapp/repository/CustomSocialUsersConnectionRepositoryIntTest.java',
        SERVER_TEST_SRC_DIR + 'com/mycompany/myapp/service/SocialServiceIntTest.java'
    ],

    jwt: [
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/jwt/JWTConfigurer.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/jwt/JWTFilter.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/security/jwt/TokenProvider.java'
    ],

    messageBroker: [
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/MessagingConfiguration.java',
        DOCKER_DIR + 'kafka.yml'
    ],

    uaa: [
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/UaaConfiguration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/UaaWebSecurityConfiguration.java'
    ],

    gateway: [
        SERVER_MAIN_RES_DIR + 'config/bootstrap.yml',
        SERVER_MAIN_RES_DIR + 'config/bootstrap-dev.yml',
        SERVER_MAIN_RES_DIR + 'config/bootstrap-prod.yml',
        SERVER_TEST_RES_DIR + 'config/bootstrap.yml',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/GatewayConfiguration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/gateway/ratelimiting/RateLimitingFilter.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/gateway/ratelimiting/RateLimitingRepository.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/rest/vm/RouteVM.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/web/rest/GatewayResource.java',
        CLIENT_MAIN_SRC_DIR + 'app/admin/gateway/gateway.controller.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/gateway/gateway.state.js',
        CLIENT_MAIN_SRC_DIR + 'app/admin/gateway/gateway.html',
        CLIENT_MAIN_SRC_DIR + 'app/admin/gateway/gateway.routes.service.js'
    ],

    microservice: [
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/MicroserviceSecurityConfiguration.java'
    ],

    microserviceGradle: [
        'gradle/docker.gradle'
    ],

    dockerServices: [
        DOCKER_DIR + 'app.yml',
        DOCKER_DIR + 'Dockerfile',
        DOCKER_DIR + 'sonar.yml'
    ],

    mysql: [
        DOCKER_DIR + 'mysql.yml'
    ],

    mariadb: [
        DOCKER_DIR + 'mariadb.yml'
    ],

    mssql: [
        DOCKER_DIR + 'mssql.yml'
    ],

    postgresql: [
        DOCKER_DIR + 'postgresql.yml'
    ],

    mongodb: [
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/dbmigrations/InitialSetupMigration.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/domain/util/JSR310DateConverters.java',
        DOCKER_DIR + 'mongodb.yml',
        DOCKER_DIR + 'mongodb-cluster.yml',
        DOCKER_DIR + 'mongodb/MongoDB.Dockerfile',
        DOCKER_DIR + 'mongodb/scripts/init_replicaset.js'
    ],

    cassandra: [
        SERVER_MAIN_RES_DIR + 'config/cql/create-keyspace-prod.cql',
        SERVER_MAIN_RES_DIR + 'config/cql/create-keyspace.cql',
        SERVER_MAIN_RES_DIR + 'config/cql/drop-keyspace.cql',
        SERVER_MAIN_RES_DIR + 'config/cql/changelog/00000000000000_create-tables.cql',
        SERVER_MAIN_RES_DIR + 'config/cql/changelog/00000000000001_insert_default_users.cql',
        DOCKER_DIR + 'cassandra/Cassandra-Migration.Dockerfile',
        DOCKER_DIR + 'cassandra/scripts/autoMigrate.sh',
        DOCKER_DIR + 'cassandra/scripts/execute-cql.sh',
        DOCKER_DIR + 'cassandra-cluster.yml',
        DOCKER_DIR + 'cassandra-migration.yml',
        DOCKER_DIR + 'cassandra.yml'
    ],

    elasticsearch: [
        DOCKER_DIR + 'elasticsearch.yml',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/repository/search/UserSearchRepository.java',
        SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/ElasticSearchConfiguration.java',
        SERVER_TEST_SRC_DIR + 'com/mycompany/myapp/config/elasticsearch/IndexReinitializer.java'
    ],

    eureka: [
        DOCKER_DIR + 'central-server-config/localhost-config/application.yml',
        DOCKER_DIR + 'central-server-config/docker-config/application.yml',
        DOCKER_DIR + 'jbooter-registry.yml'
    ],

    consul: [
        DOCKER_DIR + 'central-server-config/application.yml',
        DOCKER_DIR + 'consul.yml',
        DOCKER_DIR + 'config/git2consul.json'
    ]
};

describe('JBooter generator', function () {

    describe('default configuration', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'skipClient': false,
                    'skipUserManagement': false,
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected default files', function () {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.maven);
            assert.file(expectedFiles.client);
            assert.file(expectedFiles.dockerServices);
            assert.file(expectedFiles.mysql);
        });
    });

    describe('default configuration using yarn flag', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false, yarn: true})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'skipClient': false,
                    'skipUserManagement': false,
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected default files', function () {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.maven);
            assert.file(expectedFiles.client);
            assert.file(expectedFiles.dockerServices);
            assert.file(expectedFiles.mysql);
        });
        it('contains install-node-and-yarn in pom.xml', function () {
            assert.fileContent('pom.xml', /install-node-and-yarn/);
        });
    });

    describe('mariadb configuration', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Disk',
                    'prodDatabaseType': 'mariadb',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'skipClient': false,
                    'skipUserManagement': false,
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected default files', function () {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.maven);
            assert.file(expectedFiles.client);
            assert.file(expectedFiles.dockerServices);
            assert.file(expectedFiles.mariadb);
        });
    });

    describe('default gradle configuration', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'gradle',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected default files for gradle', function () {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.gradle);
            assert.file(expectedFiles.client);
            assert.file(['gradle/yeoman.gradle']);
            assert.file(expectedFiles.dockerServices);
            assert.file(expectedFiles.mysql);
        });
    });

    describe('package names', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.otherpackage',
                    'packageFolder': 'com/otherpackage',
                    'authenticationType': 'session',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected files with correct package names', function () {
            assert.file([
                SERVER_MAIN_SRC_DIR + 'com/otherpackage/JbooterApp.java'
            ]);
            assert.fileContent(SERVER_MAIN_SRC_DIR + 'com/otherpackage/JbooterApp.java', /package com\.otherpackage;/);
            assert.fileContent(SERVER_MAIN_SRC_DIR + 'com/otherpackage/JbooterApp.java', /public class JbooterApp/);
        });
    });

    describe('bad application name for java', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': '21Points',
                    'packageName': 'com.otherpackage',
                    'packageFolder': 'com/otherpackage',
                    'authenticationType': 'session',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected files with default application name', function () {
            assert.file([
                SERVER_MAIN_SRC_DIR + 'com/otherpackage/Application.java'
            ]);
            assert.fileContent(SERVER_MAIN_SRC_DIR + 'com/otherpackage/Application.java', /public class Application/);
        });
    });

    describe('application names', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'myapplication',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected files with correct application name', function () {
            assert.file([
                CLIENT_MAIN_SRC_DIR + 'app/home/home.state.js'
            ]);
            assert.fileContent(CLIENT_MAIN_SRC_DIR + 'app/home/home.state.js', /myapplicationApp/);
        });
    });

    describe('oauth2', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'oauth2',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected files with authenticationType "oauth2"', function () {
            assert.file([
                SERVER_MAIN_SRC_DIR + 'com/mycompany/myapp/config/OAuth2ServerConfiguration.java'
            ]);
        });
    });

    describe('hazelcast', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'hazelcast',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

    });

    describe('postgresql and elasticsearch', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'no',
                    'databaseType': 'sql',
                    'devDatabaseType': 'postgresql',
                    'prodDatabaseType': 'postgresql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'skipClient': false,
                    'skipUserManagement': false,
                    'serverSideOptions' : [
                        'searchEngine:elasticsearch'
                    ]
                })
                .on('end', done);
        });

        it('creates expected files with "PostgreSQL" and "Elasticsearch"', function () {
            assert.file(expectedFiles.postgresql);
            assert.file(expectedFiles.elasticsearch);
        });
    });

    describe('mongodb', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'no',
                    'databaseType': 'mongodb',
                    'devDatabaseType': 'mongodb',
                    'prodDatabaseType': 'mongodb',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'skipClient': false,
                    'skipUserManagement': false,
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected files with "MongoDB"', function () {
            assert.file(expectedFiles.mongodb);
        });
    });

    describe('mssql', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'no',
                    'databaseType': 'sql',
                    'devDatabaseType': 'mssql',
                    'prodDatabaseType': 'mssql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'skipClient': false,
                    'skipUserManagement': false,
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected files with "Microsoft SQL Server"', function () {
            assert.file(expectedFiles.mssql);
            assert.fileContent('pom.xml', /mssql-jdbc/);
            assert.fileContent(SERVER_MAIN_RES_DIR + 'config/liquibase/changelog/00000000000000_initial_schema.xml', /identityInsertEnabled/);
        });
    });

    describe('cassandra', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'no',
                    'databaseType': 'cassandra',
                    'devDatabaseType': 'cassandra',
                    'prodDatabaseType': 'cassandra',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'skipClient': false,
                    'skipUserManagement': false,
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected files with "Cassandra"', function () {
            assert.file(expectedFiles.cassandra);
        });
    });

    describe('cassandra no i18n', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'no',
                    'databaseType': 'cassandra',
                    'devDatabaseType': 'cassandra',
                    'prodDatabaseType': 'cassandra',
                    'useSass': false,
                    'enableTranslation': false,
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'skipClient': false,
                    'skipUserManagement': false,
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected files with "Cassandra"', function () {
            assert.file(expectedFiles.cassandra);
            assert.noFile(expectedFiles.i18n);
            assert.file([SERVER_MAIN_RES_DIR + 'i18n/messages.properties']);
        });
    });

    describe('no i18n', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'hazelcast',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': false,
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('does not create i18n files if i18n is disabled', function () {
            assert.noFile(expectedFiles.i18n);
            assert.file([SERVER_MAIN_RES_DIR + 'i18n/messages.properties']);
        });
    });

    describe('social login for http session', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : [
                        'enableSocialSignIn:true'
                    ]
                })
                .on('end', done);
        });

        it('creates expected files with social login for http session enabled', function () {
            assert.file(expectedFiles.socialLogin);
        });
    });

    describe('social login for JWT session', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'jwt',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : [
                        'enableSocialSignIn:true'
                    ]
                })
                .on('end', done);
        });

        it('creates expected files with social login for http session enabled', function () {
            assert.file(expectedFiles.socialLogin);
        });
    });

    describe('JWT authentication', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'jwt',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected files with JWT authentication', function () {
            assert.file(expectedFiles.jwt);
        });
    });

    describe('Messaging with Kafka configuration', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'serverPort': '8080',
                    'authenticationType': 'session',
                    'hibernateCache': 'ehcache',
                    'clusteredHttpSession': false,
                    'websocket': false,
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Disk',
                    'prodDatabaseType': 'mysql',
                    'searchEngine': false,
                    'buildTool': 'maven',
                    'enableSocialSignIn': false,
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'useSass': false,
                    'applicationType': 'monolith',
                    'testFrameworks': [
                        'gatling'
                    ],
                    'jhiPrefix': 'jhi',
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': [
                        'en'
                    ],
                    'serverSideOptions' : [
                        'messageBroker:kafka'
                    ]
                })
                .on('end', done);
        });

        it('creates expected files with Kafka message broker enabled', function () {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.messageBroker);
        });
    });

    describe('skip client', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, skipClient: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'buildTool': 'maven',
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected files for default configuration with skip client option enabled', function () {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.maven);
            assert.noFile(expectedFiles.client);
        });
    });

    describe('skip client with gradle', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, skipClient: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'buildTool': 'gradle',
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected files for default configuration with skip client option enabled', function () {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.gradle);
            assert.noFile(expectedFiles.client);
            assert.noFile(['gradle/yeoman.gradle']);
        });
    });

    describe('gateway with eureka', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'applicationType': 'gateway',
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'jwt',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : [],
                    'serviceDiscoveryType' : 'eureka'
                })
                .on('end', done);
        });

        it('creates expected files with the gateway application type', function () {
            assert.file(expectedFiles.jwt);
            assert.file(expectedFiles.gateway);
            assert.file(expectedFiles.eureka);
            assert.noFile(expectedFiles.consul);
        });
    });

    describe('microservice with eureka', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'applicationType': 'microservice',
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'jwt',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'mysql',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : [],
                    'serviceDiscoveryType' : 'eureka'
                })
                .on('end', done);
        });

        it('creates expected files with the microservice application type', function () {
            assert.file(expectedFiles.jwt);
            assert.file(expectedFiles.microservice);
            assert.file(expectedFiles.dockerServices);
            assert.file(expectedFiles.eureka);
            assert.noFile(expectedFiles.consul);
        });
    });

    describe('gateway with consul', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'applicationType': 'gateway',
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'jwt',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : [],
                    'serviceDiscoveryType' : 'consul'
                })
                .on('end', done);
        });

        it('creates expected files with the gateway application type', function () {
            assert.file(expectedFiles.jwt);
            assert.file(expectedFiles.gateway);
            assert.noFile(expectedFiles.eureka);
            assert.file(expectedFiles.consul);
        });
    });

    describe('microservice with consul', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'applicationType': 'microservice',
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'jwt',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'mysql',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : [],
                    'serviceDiscoveryType' : 'consul'
                })
                .on('end', done);
        });

        it('creates expected files with the microservice application type', function () {
            assert.file(expectedFiles.jwt);
            assert.file(expectedFiles.microservice);
            assert.file(expectedFiles.dockerServices);
            assert.noFile(expectedFiles.eureka);
            assert.file(expectedFiles.consul);
        });
    });

    describe('microservice with gradle and eureka', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'applicationType': 'microservice',
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'jwt',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'gradle',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : [],
                    'skipClient': true,
                    'skipUserManagement': true,
                    'serviceDiscoveryType' : 'eureka'
                })
                .on('end', done);
        });

        it('creates expected files with the microservice application type', function () {
            assert.file(expectedFiles.jwt);
            assert.file(expectedFiles.microservice);
            assert.file(expectedFiles.microserviceGradle);
            assert.file(expectedFiles.eureka);
            assert.noFile(expectedFiles.consul);
        });
    });

    describe('UAA server with Eureka', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .withPrompts({
                    'applicationType': 'uaa',
                    'baseName': 'jbooter-uaa',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'serverPort': '9999',
                    'authenticationType': 'uaa',
                    'hibernateCache': 'no',
                    'databaseType': 'sql',
                    'devDatabaseType': 'mysql',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : [],
                    'serviceDiscoveryType' : 'eureka'
                })
                .on('end', done);
        });

        it('creates expected files with the UAA application type', function () {
            assert.file(expectedFiles.uaa);
            assert.file(expectedFiles.dockerServices);
            assert.file(expectedFiles.eureka);
        });
    });

    describe('UAA gateway with eureka', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/app'))
                .withOptions({skipInstall: true, checkInstall: false})
                .inTmpDir(function (dir) {
                    fse.copySync(path.join(__dirname, './templates/uaaserver/'), dir);
                })
                .withPrompts({
                    'applicationType': 'gateway',
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'serverPort': '8080',
                    'authenticationType': 'uaa',
                    'uaaBaseName': './uaa/',
                    'hibernateCache': 'hazelcast',
                    'databaseType': 'sql',
                    'devDatabaseType': 'mysql',
                    'prodDatabaseType': 'mysql',
                    'useSass': false,
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : [],
                    'serviceDiscoveryType' : 'eureka'
                })
                .on('end', done);
        });

        it('creates expected files for UAA auth with the Gateway application type', function () {
            assert.file(expectedFiles.microservice);
            assert.file(expectedFiles.gateway);
            assert.file(expectedFiles.dockerServices);
            assert.file(expectedFiles.eureka);
        });
    });
});

describe('JBooter server generator', function () {
    describe('generate server', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/server'))
                .withOptions({skipInstall: true, gatling: true, checkInstall: false})
                .withPrompts({
                    'baseName': 'jbooter',
                    'packageName': 'com.mycompany.myapp',
                    'packageFolder': 'com/mycompany/myapp',
                    'authenticationType': 'session',
                    'hibernateCache': 'ehcache',
                    'databaseType': 'sql',
                    'devDatabaseType': 'h2Memory',
                    'prodDatabaseType': 'mysql',
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'buildTool': 'maven',
                    'rememberMeKey': '5c37379956bd1242f5636c8cb322c2966ad81277',
                    'serverSideOptions' : []
                })
                .on('end', done);
        });

        it('creates expected files for default configuration with gatling enabled for server generator', function () {
            assert.file(expectedFiles.server);
            assert.file(expectedFiles.maven);
            assert.noFile(expectedFiles.client);
        });
    });
});

describe('JBooter client generator', function () {
    describe('generate client', function () {
        beforeEach(function (done) {
            helpers.run(path.join(__dirname, '../generators/client'))
                .withOptions({skipInstall: true, auth: 'session'})
                .withPrompts({
                    'baseName': 'jbooter',
                    'enableTranslation': true,
                    'nativeLanguage': 'en',
                    'languages': ['fr'],
                    'useSass': true
                })
                .on('end', done);
        });

        it('creates expected files for default configuration for client generator', function () {
            assert.noFile(expectedFiles.server);
            assert.noFile(expectedFiles.maven);
            assert.file(expectedFiles.client);
        });
    });
});