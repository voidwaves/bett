package de.berufsschule.berichtsheft.reportEntry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReportEntryRepository extends JpaRepository<ReportEntry, Integer> {

    List<ReportEntry> findByUserId(Integer userId);
}
