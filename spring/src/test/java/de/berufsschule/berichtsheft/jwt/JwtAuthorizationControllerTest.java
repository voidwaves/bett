package de.berufsschule.berichtsheft.jwt;

import de.berufsschule.berichtsheft.user.User;
import de.berufsschule.berichtsheft.util.JwtTokenUtil;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

import static de.berufsschule.berichtsheft.TestUtil.getRootUrl;
import static de.berufsschule.berichtsheft.jwt.JwtTestUtil.createInvalidJwtRequest;
import static de.berufsschule.berichtsheft.jwt.JwtTestUtil.createValidJwtRequest;
import static de.berufsschule.berichtsheft.user.UserTestUtil.createValidUser;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class JwtAuthorizationControllerTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private Flyway flyway;

    @Autowired
    private JwtTokenUtil tokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    private static String TOKEN;

    @BeforeEach
    public void setup() {
        flyway.clean();
        flyway.migrate();
    }

    @Test
    public void testAuthenticateSuccess() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/authenticate")
                .build().toUri();

        HttpEntity<JwtRequest> request = new HttpEntity<>(createValidJwtRequest());

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.POST, request, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody()).contains("token");
    }

    @Test
    public void testAuthenticateError() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/authenticate")
                .build().toUri();

        HttpEntity<JwtRequest> request = new HttpEntity<>(createInvalidJwtRequest());

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.POST, request, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    public void testRegister() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/register")
                .build().toUri();

        HttpEntity<User> request = new HttpEntity<>(createValidUser(false));

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.POST, request, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}