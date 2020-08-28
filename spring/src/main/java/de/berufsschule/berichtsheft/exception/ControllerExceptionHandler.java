package de.berufsschule.berichtsheft.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;

@ControllerAdvice
@Slf4j
public class ControllerExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    private ResponseEntity<?> handleException(DataIntegrityViolationException e,
                                              HttpServletRequest request) {

        log.error("ERROR: {}: {}", request.getRequestURI(), e.getMessage());
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    @ExceptionHandler(Exception.class)
    private ResponseEntity<?> handleException(Exception e, HttpServletRequest request) {

        log.error("ERROR: {}: {}", request.getRequestURI(), e.getMessage());
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
