package com.people_manager.base.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class ApiWebConfig {

    @Bean
    public FilterRegistrationBean corsFilter() {
        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", this.getCorsConfiguration());
        var bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(0);
        return bean;
    }

    public CorsConfiguration getCorsConfiguration() {
        var config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("http://*");
        config.addAllowedOriginPattern("https://*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        return config;
    }
}
