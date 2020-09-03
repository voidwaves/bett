package de.berufsschule.berichtsheft.reportentry;

import de.berufsschule.berichtsheft.reportEntry.ReportEntry;
import de.berufsschule.berichtsheft.reportEntry.ReportEntryRepository;
import de.berufsschule.berichtsheft.reportEntry.ReportEntryService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static de.berufsschule.berichtsheft.TestUtil.*;
import static de.berufsschule.berichtsheft.reportentry.ReportEntryTestUtil.createValidReportEntry;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class ReportEntryServiceTest {

    private ReportEntryService reportEntryService;
    private ReportEntryRepository reportEntryRepository;

    @BeforeEach
    public void setup() {
        reportEntryRepository = mock(ReportEntryRepository.class);
        reportEntryService = new ReportEntryService(reportEntryRepository);
    }

    @AfterEach
    public void after() {
        reset(reportEntryRepository);
    }

    @Test
    public void testExistsByIdPositive() {
        when(reportEntryRepository.findById(TEST_ID)).thenReturn(Optional.of(createValidReportEntry(true)));
        final boolean result = reportEntryService.existsById(TEST_ID);
        assertThat(result).isTrue();
        verify(reportEntryRepository).findById(TEST_ID);
        verifyNoMoreInteractions(reportEntryRepository);
    }

    @Test
    public void testExistsByIdNegative() {
        when(reportEntryRepository.findById(TEST_ID)).thenReturn(Optional.empty());
        final boolean result = reportEntryService.existsById(TEST_ID);
        assertThat(result).isFalse();
        verify(reportEntryRepository).findById(TEST_ID);
        verifyNoMoreInteractions(reportEntryRepository);
    }

    @Test
    public void testFindAllInDateRangeByUserId() {
        ReportEntry reportEntry = createValidReportEntry(true);
        when(reportEntryRepository.findAllInDateRangeByUserId(TEST_DATE_1, TEST_DATE_2, TEST_ID))
                .thenReturn(Collections.singletonList(reportEntry));
        final List<ReportEntry> result = reportEntryService.findAllInDateRangeByUserId(TEST_DATE_1, TEST_DATE_2, TEST_ID);
        assertThat(result).isNotNull();
        assertThat(result.get(0)).isNotNull();
        assertThat(result.get(0).getUserId()).isEqualTo(reportEntry.getUserId());
        verify(reportEntryRepository).findAllInDateRangeByUserId(TEST_DATE_1, TEST_DATE_2, TEST_ID);
        verifyNoMoreInteractions(reportEntryRepository);
    }

    @Test
    public void testSave() {
        ReportEntry reportEntry = createValidReportEntry(false);
        reportEntryService.save(reportEntry);
        verify(reportEntryRepository).save(reportEntry);
        verifyNoMoreInteractions(reportEntryRepository);
    }

    @Test
    public void testDeleteById() {
        reportEntryService.deleteById(1);
        verify(reportEntryRepository).deleteById(1);
        verifyNoMoreInteractions(reportEntryRepository);
    }
}
