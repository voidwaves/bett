package de.berufsschule.berichtsheft.reportEntry;

import de.berufsschule.berichtsheft.user.User;
import de.berufsschule.berichtsheft.user.UserService;
import de.berufsschule.berichtsheft.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
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
public class ReportEntryController {

    private final ReportEntryService reportEntryService;
    private final UserService userService;
    private final JwtTokenUtil tokenUtil;

    @GetMapping
    private ResponseEntity<?> getReportEntryListInDateRange(
            @RequestHeader("Authorization") String authorization,
            @RequestParam("start") String start,
            @RequestParam("end") String end) {

        LocalDate startDate = parseToLocalDate(start);
        LocalDate endDate = parseToLocalDate(end);

        String token = authorization.substring(7);
        String username = tokenUtil.getUsernameFromToken(token);
        User user = userService.findByUsername(username);

        List<ReportEntry> reportEntries = reportEntryService
                .findAllInDateRangeByUserId(startDate, endDate, user.getId());

        return new ResponseEntity<>(reportEntries, HttpStatus.OK);
    }
}
