package de.berufsschule.berichtsheft.jwt;

import de.berufsschule.berichtsheft.user.User;
import de.berufsschule.berichtsheft.user.UserService;
import de.berufsschule.berichtsheft.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
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
    private final UserService userService;

    /**
     * Endpunkt zum Authentifizieren eines Benutzers
     * @param jwtRequest Benutzername und Passwort werden in diesem Objekt gespeichert
     * @return Wenn sich der User erfolgreich anmeldet, erhält er einen fünf Stunden lang güligen Token, wenn nicht
     *         wird davor eine {@link org.springframework.security.authentication.BadCredentialsException} geworfen
     */
    @PostMapping("/authenticate")
    private ResponseEntity<?> authenticateUser(@RequestBody JwtRequest jwtRequest) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                jwtRequest.getUsername(), jwtRequest.getPassword()));
        UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUsername());
        String token = tokenUtil.generateToken(userDetails);
        log.info("POST: logged in user: {}", jwtRequest.getUsername());
        return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
    }

    /**
     * Endpunkt zum Registrieren eines neuen Benutzers.
     * @param user Das User-Objekt, welche alle Informationen des Users enthält
     * @return HTTP 200, wenn kein Konflikt entsteht
     */
    @PostMapping("/register")
    private ResponseEntity<?> registerUser(@RequestBody User user) {

        userService.save(user);
        log.info("POST: registered user: {}", user.toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}