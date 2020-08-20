package de.berufsschule.berichtsheft.reportEntry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReportEntryRepository extends JpaRepository<ReportEntry, Integer> {

    List<ReportEntry> findAllByUserId(Integer id);
}
