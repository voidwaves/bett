package de.berufsschule.berichtsheft.reportEntry;

import de.berufsschule.berichtsheft.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

import static de.berufsschule.berichtsheft.util.DateUtil.parseToLocalDate;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reportentry")
@CrossOrigin
@Slf4j
public class ReportEntryController {

    private final ReportEntryService reportEntryService;
    private final UserService userService;

    @GetMapping
    private ResponseEntity<?> getReportEntryListInDateRange(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("start") String start,
            @RequestParam("end") String end) {

        LocalDate startDate = parseToLocalDate(start);
        LocalDate endDate = parseToLocalDate(end);

        Integer id = userService.findUserIdByToken(authorization);

        List<ReportEntry> reportEntries = reportEntryService
                .findAllInDateRangeByUserId(startDate, endDate, id);

        return new ResponseEntity<>(reportEntries, HttpStatus.OK);
    }

    @PostMapping
    private ResponseEntity<?> addReportEntry(
            @RequestBody ReportEntry reportEntry,
            @RequestHeader("Authorization") String authorization) {

        reportEntry.setUserId(userService.findUserIdByToken(authorization));
        reportEntryService.save(reportEntry);
        log.info("POST: adding report entry: {}", reportEntry.toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }

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
