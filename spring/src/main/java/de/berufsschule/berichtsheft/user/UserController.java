package de.berufsschule.berichtsheft.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping
    private ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(userService.findAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    private ResponseEntity<?> getUser(@PathVariable("id") Integer id) {

        User user = userService.findById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
