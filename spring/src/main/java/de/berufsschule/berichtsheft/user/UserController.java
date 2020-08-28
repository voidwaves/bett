package de.berufsschule.berichtsheft.user;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@CrossOrigin
@Slf4j
public class UserController {

    private final UserService userService;

    @GetMapping
    private ResponseEntity<?> getUser(@RequestHeader("Authorization") String authorization) {

        User user = userService.findUserByToken(authorization);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping
    private ResponseEntity<?> editUser(@RequestBody User user) {

        if (user.getId() == null || !userService.existsById(user.getId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        userService.save(user);
        log.info("PUT: editing user: {}", user.toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }

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
