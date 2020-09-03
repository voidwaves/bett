package de.berufsschule.berichtsheft.token;

import de.berufsschule.berichtsheft.jwt.JwtUserDetailsService;
import de.berufsschule.berichtsheft.util.JwtTokenUtil;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

import static de.berufsschule.berichtsheft.TestUtil.TEST_USERNAME;
import static de.berufsschule.berichtsheft.TestUtil.getRootUrl;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class TokenControllerTest {

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

        UserDetails userDetails = userDetailsService.loadUserByUsername(TEST_USERNAME);
        TOKEN = tokenUtil.generateToken(userDetails);
    }

    @Test
    public void testCheckToken() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/token/check")
                .build().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        HttpEntity<String> request = new HttpEntity<>(headers);

        ResponseEntity<Boolean> response = restTemplate.exchange(uri, HttpMethod.GET, request, Boolean.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}
