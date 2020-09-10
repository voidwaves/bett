package de.berufsschule.berichtsheft.reportEntry;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportEntryService {

    private final ReportEntryRepository reportEntryRepository;

    /**
     * Prüft, ob ein Berichtsheft-Eintrag mit der gegebenen ID existiert
     * @param id Die zu prüfende ID
     * @return true/false
     */
    public boolean existsById(Integer id) {
        return reportEntryRepository.findById(id).isPresent();
    }

    /**
     * Gibt eine Liste von Berichtshefteinträgen zurück, die zur angegebenen User-ID gehören
     * @param userId Die User ID
     * @return Eine Liste der Berichtshefteinträge (oder leere Liste)
     */
    public List<ReportEntry> findByUserId(Integer userId) {
        return reportEntryRepository.findByUserId(userId);
    }

    /**
     * Speichert (oder überschreibt) einen Eintrag in der Datenbank
     * @param reportEntry Der Eintrag, der gespeichert werden soll, oder dessen Daten auf ein vorhandenes Objekt
     *                    überschrieben werden sollen
     */
    public void save(ReportEntry reportEntry) {
        reportEntryRepository.save(reportEntry);
    }

    /**
     * Löscht einen Eintrag aus der Datenbank mit gegebener ID
     * @param id ID des zu löschenden Objekts
     */
    public void deleteById(Integer id) {
        reportEntryRepository.deleteById(id);
    }
}
