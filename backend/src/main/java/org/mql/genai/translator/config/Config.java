package org.mql.genai.translator.config;


import org.mql.genai.translator.models.Properties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Config {
    
    @Bean
    public Properties properties() {
        return new Properties();
    }
}
