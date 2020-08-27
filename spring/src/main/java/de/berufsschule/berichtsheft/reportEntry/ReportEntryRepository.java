package de.berufsschule.berichtsheft.reportEntry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReportEntryRepository extends JpaRepository<ReportEntry, Integer> {

    @Query("SELECT re FROM ReportEntry re WHERE re.userId = :userId AND " +
            "re.date BETWEEN :startDate AND :endDate")
    List<ReportEntry> findAllInDateRangeByUserId(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate,
            @Param("userId") Integer userId);
}
