package de.berufsschule.berichtsheft.reportEntry;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reportentry")
public class ReportEntryController {

    private final ReportEntryService reportEntryService;

    @GetMapping("/{id}")
    private ResponseEntity<?> getReportEntry(@PathVariable("id") Integer id) {

        return new ResponseEntity<>(reportEntryService.findByUserId(id), HttpStatus.OK);
    }
}
