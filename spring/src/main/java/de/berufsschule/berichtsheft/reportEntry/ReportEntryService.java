package de.berufsschule.berichtsheft.reportEntry;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportEntryService {

    private final ReportEntryRepository reportEntryRepository;

    public boolean existsById(Integer id) {
        return reportEntryRepository.findById(id).isPresent();
    }

    public List<ReportEntry> findAllInDateRangeByUserId(LocalDate startDate, LocalDate endDate, Integer userId) {
        return reportEntryRepository.findAllInDateRangeByUserId(startDate, endDate, userId);
    }

    public void save(ReportEntry reportEntry) {
        reportEntryRepository.save(reportEntry);
    }

    public void deleteById(Integer id) {
        reportEntryRepository.deleteById(id);
    }
}
