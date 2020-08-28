package de.berufsschule.berichtsheft.reportentry;

import de.berufsschule.berichtsheft.reportEntry.ReportEntry;

import java.time.LocalDate;

public class ReportEntryTestUtil {

    static ReportEntry createValidReportEntry(boolean withId) {
        ReportEntry reportEntry = new ReportEntry();
        if (withId) reportEntry.setId(1);
        reportEntry.setContent("asd");
        reportEntry.setReportDate(LocalDate.of(2020, 7, 12));
        reportEntry.setDepartment("asdasd");
        reportEntry.setWorkingHours(7.8);
        reportEntry.setUserId(1);
        return reportEntry;
    }

    static ReportEntry createInvalidReportEntry(boolean withId) {
        ReportEntry reportEntry = new ReportEntry();
        if (withId) reportEntry.setId(1);
        reportEntry.setContent("asd");
        reportEntry.setReportDate(LocalDate.of(2020, 8, 22));
        reportEntry.setDepartment("asdasd");
        reportEntry.setWorkingHours(7.8);
        reportEntry.setUserId(1);
        return reportEntry;
    }
}
