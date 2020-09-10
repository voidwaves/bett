package de.berufsschule.berichtsheft.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;

/**
 * Eine Klasse mit der Notation "ControllerAdvice" wird aufgerufen, wenn es in einem der Controller zu einer
 * Exception kommt. Dadurch muss man diese nicht immer "vor Ort" handlen, sondern kann hier für jeden Error
 * eine bestimmte Aktion ausführen
 */
@ControllerAdvice
@Slf4j
public class ControllerExceptionHandler {

    /**
     * Loggt einen Error in die Konsole und gibt einen 407 zurück, wenn es zu einem Konflikt in der Datenbank kam. Zum
     * Beispiel wenn man einen doppelten Wert in einer mit "UNIQUE" annotierten Spalte hinzufügen will
     * @param e Der geworfene Error
     * @param request Der Request, in dem der Error geworfen wurde
     * @return Den passenden HTTP-Code
     */
    @ExceptionHandler(DataIntegrityViolationException.class)
    private ResponseEntity<?> handleException(DataIntegrityViolationException e,
                                              HttpServletRequest request) {

        log.error("ERROR: {}: {}", request.getRequestURI(), e.getMessage());
        return new ResponseEntity<>(HttpStatus.CONFLICT);
    }

    /**
     * Loggt einen Error in die Konsole und gibt einen 401 zurück, wenn der Benutzer falsche Eingaben beim Login macht
     * @param e Der geworfene Error
     * @param request Der Request, in dem der Error geworfen wurde
     * @return Den passenden HTTP-Code
     */
    @ExceptionHandler(BadCredentialsException.class)
    private ResponseEntity<?> handleException(BadCredentialsException e, HttpServletRequest request) {

        log.error("ERROR: {}: {}", request.getRequestURI(), e.getMessage());
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    /**
     * Loggt einen Error in die Konsole und gibt einen 400. Fängt andere Errors ab, die nicht spezifisch abgesucht werden.
     * @param e Der geworfene Error
     * @param request Der Request, in dem der Error geworfen wurde
     * @return Den passenden HTTP-Code
     */
    @ExceptionHandler(Exception.class)
    private ResponseEntity<?> handleException(Exception e, HttpServletRequest request) {

        log.error("ERROR: {}: {}", request.getRequestURI(), e.getMessage());
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
