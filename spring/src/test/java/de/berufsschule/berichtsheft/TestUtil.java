package de.berufsschule.berichtsheft;

import java.time.LocalDate;

public final class TestUtil {

    public static LocalDate TEST_DATE_1 = LocalDate.of(2020, 7, 20);
    public static LocalDate TEST_DATE_2 = LocalDate.of(2020, 9, 20);

    public static String TEST_USERNAME = "testuser";
    public static String TEST_PASSWORD = "password";
    public static String TEST_ENCODED_PASSWORD = "drowssap";

    public static String TEST_AUTHORIZATION = "foo authorization";
    public static String TEST_TOKEN = "bar token";

    public static Integer TEST_ID = 123;
    public static Integer TEST_ID_2 = 456;

    public static String getRootUrl(int port) {
        return "http://localhost:" + port;
    }
}
