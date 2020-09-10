package de.berufsschule.berichtsheft.reportEntry;

import de.berufsschule.berichtsheft.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller zum Abfragen, Hinzufügen, Bearbeiten und Löschen von Bertichtshefteinträgen
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/reportentry")
@CrossOrigin
@Slf4j
public class ReportEntryController {

    private final ReportEntryService reportEntryService;
    private final UserService userService;

    /**
     * Endpunkt zum Abfragen von Berichtshefteinträgen
     * @param authorization Der mitgegebene Token, aus dem der Benutzername herausgenommen werden kann
     * @return Das erhaltene Berichtsheft-Objekt (als JSON) (und HTTP 200)
     */
    @GetMapping
    private ResponseEntity<?> getReportEntryListInDateRange(
            @RequestHeader("Authorization") String authorization) {

        Integer id = userService.findUserIdByToken(authorization);

        List<ReportEntry> reportEntries = reportEntryService.findByUserId(id);

        return new ResponseEntity<>(reportEntries, HttpStatus.OK);
    }

    /**
     * Endpunkt zum hinzufügen eines Berichtsheft-Eintrages
     * @param reportEntry Der mitgeschickte neue Eintrag, der hinzugefügt werden soll
     * @param authorization Der mitgegebene Token, aus dem der Benutzername herausgenommen werden kann
     * @return HTTP 200, wenn alles gut lief
     */
    @PostMapping
    private ResponseEntity<?> addReportEntry(
            @RequestBody ReportEntry reportEntry,
            @RequestHeader("Authorization") String authorization) {

        reportEntry.setUserId(userService.findUserIdByToken(authorization));
        reportEntryService.save(reportEntry);
        log.info("POST: adding report entry: {}", reportEntry.toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Endpunkt zum Bearbeiten eines Berichtsheft-Eintrags. Unterscheidet sich zum Speichern, dass das Berichtsheft-
     * Objekt eine ID haben muss die in der DB existiert (dieses Object wird dann in der DB überschrieben)
     * @param reportEntry Das Berichtsheft-Objekt, mit den zu überschreibenden Werten
     * @param authorization Der mitgegebene Token, aus dem der Benutzername herausgenommen werden kann
     * @return HTTP 200, wenn alles gut lief
     */
    @PutMapping
    private ResponseEntity<?> editReportEntry(
            @RequestBody ReportEntry reportEntry,
            @RequestHeader("Authorization") String authorization) {

        if (reportEntry.getId() == null || !reportEntryService.existsById(reportEntry.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        reportEntry.setUserId(userService.findUserIdByToken(authorization));
        reportEntryService.save(reportEntry);
        log.info("PUT: editing report entry: {}", reportEntry.toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Endpunkt zum Löschen eines Eintrages
     * @param id Die ID des Berichtshefteintrags, welches gelöscht werden soll
     * @return Bad Request (400) wenn die ID nicht existiert, ansonsten HTTP 200
     */
    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteReportEntry(@PathVariable("id") Integer id) {

        if (!reportEntryService.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        reportEntryService.deleteById(id);
        log.info("DELETE: deleting report entry with id: {}", id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
