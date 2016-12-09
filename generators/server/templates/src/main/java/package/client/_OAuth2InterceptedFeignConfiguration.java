package <%=packageName%>.client;

import <%=packageName%>.config.JBooterProperties;
import feign.RequestInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.client.loadbalancer.LoadBalancerClient;
import org.springframework.cloud.security.oauth2.client.feign.OAuth2FeignRequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.DefaultOAuth2ClientContext;

import javax.inject.Inject;
import java.io.IOException;

@Configuration
public class OAuth2InterceptedFeignConfiguration {

    private JBooterProperties jBooterProperties;

    private LoadBalancerClient loadBalancerClient;

    @Bean(name = "oauth2RequestInterceptor")
    public RequestInterceptor getOAuth2RequestInterceptor() throws IOException {
        if (loadBalancerClient != null) {
            jBooterProperties.getSecurity().getClientAuthorization().setLoadBalancerClient(loadBalancerClient);
        }
        return new OAuth2FeignRequestInterceptor(
            new DefaultOAuth2ClientContext(), jBooterProperties.getSecurity().getClientAuthorization()
        );
    }

    @Inject
    public void setjBooterProperties(JBooterProperties jBooterProperties) {
        this.jBooterProperties = jBooterProperties;
    }

    @Autowired(required = false)
    public void setLoadBalancerClient(LoadBalancerClient loadBalancerClient) {
        this.loadBalancerClient = loadBalancerClient;
    }
}
