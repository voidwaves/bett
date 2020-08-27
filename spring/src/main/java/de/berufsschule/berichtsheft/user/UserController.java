package de.berufsschule.berichtsheft.user;

import de.berufsschule.berichtsheft.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final JwtTokenUtil tokenUtil;

    @GetMapping
    private ResponseEntity<?> getUser(@RequestHeader("Authorization") String authorization) {

        String token = authorization.substring(7);
        String username = tokenUtil.getUsernameFromToken(token);
        User user = userService.findByUsername(username);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
