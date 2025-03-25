package sg.edu.nus.iss.server.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import sg.edu.nus.iss.server.components.TokenAuthenticationFilter;

@Configuration
public class SercurityConfig {
    private static final String[] WHITELISTED_API_ENDPOINTS = { "/api/user", "/api/user/login", "/api/user/refresh-token", "/api/messaging/token" };

    // private final TokenAuthenticationFilter tokenAuthenticationFilter;

    // public SercurityConfig(TokenAuthenticationFilter tokenAuthenticationFilter) {
    //     this.tokenAuthenticationFilter = tokenAuthenticationFilter;
    // }

    @Autowired
    private TokenAuthenticationFilter tokenAuthenticationFilter;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults())
            .csrf((csrf) -> csrf.disable())
            .authorizeHttpRequests(authManager -> {
                authManager
                // .requestMatchers(HttpMethod.POST, WHITELISTED_API_ENDPOINTS)
                //     .permitAll()
                // .requestMatchers(HttpMethod.GET, "/","/user/login", "/error")
                //     .permitAll()
                // TODO change back the permissions!!
                .anyRequest()
                    .permitAll();
                    // .authenticated();
            })
            .addFilterBefore(tokenAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
            // .oauth2Login(Customizer.withDefaults());

        return http.build();
    }

}
