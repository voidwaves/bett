package de.berufsschule.berichtsheft.user;

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
import static de.berufsschule.berichtsheft.user.UserTestUtil.createInvalidUser;
import static de.berufsschule.berichtsheft.user.UserTestUtil.createValidUser;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UserControllerTest {

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
    public void testGetUserSuccess() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/user")
                .build().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        HttpEntity<String> request = new HttpEntity<>(headers);

        ResponseEntity<User> response = restTemplate.exchange(uri, HttpMethod.GET, request, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(response.getBody()).isNotNull();
        assertThat(response.getBody().getUsername()).isEqualTo(TEST_USERNAME);
    }

    @Test
    public void testGetUserUnauthorized() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/user")
                .build().toUri();

        ResponseEntity<User> response = restTemplate.exchange(uri, HttpMethod.GET, null, User.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    public void testEditUserSuccess() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/user")
                .build().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        HttpEntity<User> request = new HttpEntity<>(createValidUser(true), headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.PUT, request, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void testEditUserConflict() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/user")
                .build().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        HttpEntity<User> request = new HttpEntity<>(createInvalidUser(true), headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.PUT, request, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
    }

    @Test
    public void testDeleteReportEntrySuccess() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/user/2")
                .build().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        HttpEntity<String> request = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.DELETE, request, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void testDeleteReportEntryError() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/user/6")
                .build().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        HttpEntity<String> request = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.DELETE, request, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
}
