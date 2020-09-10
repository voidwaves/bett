package de.berufsschule.berichtsheft.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public final class DateUtil {

    private static final DateTimeFormatter localDateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    /**
     * Übersetzt den gegebenen String (wenn dieser im richtigen Format ist) zu einem {@link LocalDate} Objekt
     * @param date Datum-String
     * @return Datum-Objekt
     */
    public static LocalDate parseToLocalDate(String date) {
        return LocalDate.parse(date, localDateFormatter);
    }
}
