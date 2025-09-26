package com.adcoder.notes.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping;

@Configuration
public class DebugConfig {
    @Bean
    public ApplicationRunner printMappings(ApplicationContext context) {
        return args -> {
            var handlerMapping = context.getBean(RequestMappingHandlerMapping.class);
            handlerMapping.getHandlerMethods().forEach((mapping, method) -> {
                System.out.println(mapping + " -> " + method);
            });
        };
    }
}
