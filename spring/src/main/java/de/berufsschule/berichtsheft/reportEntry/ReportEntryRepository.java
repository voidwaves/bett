package de.berufsschule.berichtsheft.reportEntry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReportEntryRepository extends JpaRepository<ReportEntry, Integer> {

    /**
     * Gibt eine Liste von Berichtshefteinträgen zurück, die zur angegebenen User-ID gehören
     * @param userId Die User ID
     * @return Eine Liste der Berichtshefteinträge (oder leere Liste)
     */
    List<ReportEntry> findByUserId(Integer userId);
}
