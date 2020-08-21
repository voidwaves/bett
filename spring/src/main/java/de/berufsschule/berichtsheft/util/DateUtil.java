package de.berufsschule.berichtsheft.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public final class DateUtil {

    private static final DateTimeFormatter localDateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    public static LocalDate parseToLocalDate(String date) {
        return LocalDate.parse(date, localDateFormatter);
    }
}
