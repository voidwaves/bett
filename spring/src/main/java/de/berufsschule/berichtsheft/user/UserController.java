package de.berufsschule.berichtsheft.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller zum Abfragen, Hinzufügen, Bearbeiten und Löschen von Usern
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin
@Slf4j
public class UserController {

    private final UserService userService;

    /**
     * Endpunkt zum Abfragen von User-Objekten
     * @param authorization Der mitgegebene Token, aus dem der Benutzername herausgenommen werden kann
     * @return Das erhaltene User-Objekt (als JSON) (und HTTP 200)
     */
    @GetMapping
    private ResponseEntity<?> getUser(@RequestHeader("Authorization") String authorization) {

        User user = userService.findUserByToken(authorization);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * Endpunkt zum Bearbeiten eines User-Eintrags. Unterscheidet sich zum Speichern (/register-Endpunkt), dass das
     * User-Objekt eine ID haben muss die in der DB existiert (dieses Object wird dann in der DB überschrieben)
     * @param user Das User-Objekt, mit den zu überschreibenden Werten
     * @return HTTP 200, wenn alles gut lief
     */
    @PutMapping
    private ResponseEntity<?> editUser(@RequestBody User user) {

        if (user.getId() == null || !userService.existsById(user.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        userService.save(user);
        log.info("PUT: editing user: {}", user.toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Endpunkt zum Löschen eines Eintrages
     * @param id Die ID des Users, welcher gelöscht werden soll
     * @return Bad Request (400) wenn die ID nicht existiert, ansonsten HTTP 200
     */
    @DeleteMapping("/{id}")
    private ResponseEntity<?> deleteUser(@PathVariable("id") Integer id) {

        if (!userService.existsById(id)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        userService.deleteById(id);
        log.info("DELETE: deleting user with id: {}", id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
