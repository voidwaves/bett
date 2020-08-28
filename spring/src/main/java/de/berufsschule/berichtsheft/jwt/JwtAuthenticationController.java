package de.berufsschule.berichtsheft.jwt;

import de.berufsschule.berichtsheft.user.User;
import de.berufsschule.berichtsheft.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@Slf4j
public class JwtAuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil tokenUtil;
    private final JwtUserDetailsService userDetailsService;

    @PostMapping("/authenticate")
    private ResponseEntity<?> authenticate(@RequestBody JwtRequest jwtRequest) {

        authenticate(jwtRequest.getUsername(), jwtRequest.getPassword());
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        String token = tokenUtil.generateToken(userDetails);
        log.info("POST: logged in user: {}", jwtRequest.getUsername());
        return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
    }

    @PostMapping("/register")
    private ResponseEntity<?> register(@RequestBody User user) {

        userDetailsService.save(user);
        log.info("POST: registered user: {}", user.toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private void authenticate(String username, String password) throws BadCredentialsException {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
    }
}