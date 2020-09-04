package de.berufsschule.berichtsheft.reportentry;

import de.berufsschule.berichtsheft.reportEntry.ReportEntry;
import de.berufsschule.berichtsheft.reportEntry.ReportEntryRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class ReportEntryRepositoryTest {

    @Autowired
    private ReportEntryRepository reportEntryRepository;

    @Test
    public void testFindByUserId() {
        final List<ReportEntry> result = reportEntryRepository.findByUserId(1);
        assertThat(result.size()).isEqualTo(2);
    }
}
