package de.berufsschule.berichtsheft.reportentry;

import de.berufsschule.berichtsheft.jwt.JwtUserDetailsService;
import de.berufsschule.berichtsheft.reportEntry.ReportEntry;
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
import static de.berufsschule.berichtsheft.reportentry.ReportEntryTestUtil.createInvalidReportEntry;
import static de.berufsschule.berichtsheft.reportentry.ReportEntryTestUtil.createValidReportEntry;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ReportEntryControllerTest {

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
    public void testGetReportEntriesSuccess() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/reportentry")
                .build().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        HttpEntity<String> request = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, request, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void testGetReportEntriesInDateRangeUnauthorized() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/reportentry")
                .queryParam("start", "2020-07-01")
                .queryParam("end", "2020-09-01")
                .build().toUri();

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, null, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    public void testAddReportEntrySuccess() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/reportentry")
                .build().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        HttpEntity<ReportEntry> request = new HttpEntity<>(createValidReportEntry(false), headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.POST, request, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void testAddReportEntryConflict() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/reportentry")
                .build().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        HttpEntity<ReportEntry> request = new HttpEntity<>(createInvalidReportEntry(false), headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.POST, request, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
    }

    @Test
    public void testEditReportEntrySuccess() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/reportentry")
                .build().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        HttpEntity<ReportEntry> request = new HttpEntity<>(createValidReportEntry(true), headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.PUT, request, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void testEditReportEntryConflict() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/reportentry")
                .build().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        HttpEntity<ReportEntry> request = new HttpEntity<>(createInvalidReportEntry(true), headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.PUT, request, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.CONFLICT);
    }

    @Test
    public void testDeleteReportEntrySuccess() {
        URI uri = UriComponentsBuilder.fromHttpUrl(getRootUrl(port))
                .path("/reportentry/2")
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
                .path("/reportentry/6")
                .build().toUri();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + TOKEN);
        HttpEntity<String> request = new HttpEntity<>(headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.DELETE, request, String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.BAD_REQUEST);
    }
}