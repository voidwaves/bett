package de.berufsschule.berichtsheft.reportEntry;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportEntryService {

    private final ReportEntryRepository reportEntryRepository;

    List<ReportEntry> findAllInDateRangeByUserId(LocalDate startDate, LocalDate endDate, Integer userId) {
        return reportEntryRepository.findAllInDateRangeByUserId(startDate, endDate, userId);
    }

    void save(ReportEntry reportEntry) {
        reportEntryRepository.save(reportEntry);
    }

    void deleteById(Integer id) {
        reportEntryRepository.deleteById(id);
    }
}
