package de.berufsschule.berichtsheft.reportEntry;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

import static de.berufsschule.berichtsheft.util.DateUtil.parseToLocalDate;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/reportentry")
public class ReportEntryController {

    private final ReportEntryService reportEntryService;

    @GetMapping
    private ResponseEntity<?> getReportEntryListInDateRange(
            @RequestParam("start") String start,
            @RequestParam("end") String end) {

        LocalDate startDate = parseToLocalDate(start);
        LocalDate endDate = parseToLocalDate(end);

        return new ResponseEntity<>(reportEntryService.findAllInDateRange(startDate, endDate), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getReportEntry(@PathVariable("id") Integer id) {

        return new ResponseEntity<>(reportEntryService.findByUserId(id), HttpStatus.OK);
    }
}
