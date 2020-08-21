package de.berufsschule.berichtsheft.reportEntry;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportEntryService {

    private final ReportEntryRepository reportEntryRepository;

    public List<ReportEntry> findByUserId(Integer id) {
        return reportEntryRepository.findAllByUserId(id);
    }

    public List<ReportEntry> findAllInDateRange(LocalDate startDate, LocalDate endDate) {
        return reportEntryRepository.findAllInDateRange(startDate, endDate);
    }
}
