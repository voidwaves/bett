package de.berufsschule.berichtsheft;

import java.time.LocalDate;

public final class TestUtil {

    public static LocalDate TEST_DATE_1 = LocalDate.of(2020, 7, 20);
    public static LocalDate TEST_DATE_2 = LocalDate.of(2020, 9, 20);

    public static String getRootUrl(int port) {
        return "http://localhost:" + port;
    }
}
