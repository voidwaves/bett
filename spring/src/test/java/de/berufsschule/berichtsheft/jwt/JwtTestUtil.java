package de.berufsschule.berichtsheft.jwt;

import static de.berufsschule.berichtsheft.TestUtil.TEST_PASSWORD;
import static de.berufsschule.berichtsheft.TestUtil.TEST_USERNAME;

public class JwtTestUtil {

    public static JwtRequest createValidJwtRequest() {
        JwtRequest request = new JwtRequest();
        request.setUsername(TEST_USERNAME);
        request.setPassword(TEST_PASSWORD);
        return request;
    }

    public static JwtRequest createInvalidJwtRequest() {
        JwtRequest request = new JwtRequest();
        request.setUsername("asdretfdghgj");
        request.setPassword("asddzuijbvciz");
        return request;
    }
}
