package de.berufsschule.berichtsheft.token;

import de.berufsschule.berichtsheft.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/token")
public class TokenController {

    private final JwtTokenUtil tokenUtil;

    /**
     * Endpunkt zum Prüfen der Gültigkeit eines Tokens
     * @param authorization Der Token, der geprüft werden soll
     * @return true/false
     */
    @GetMapping("/check")
    private ResponseEntity<?> checkToken(@RequestHeader("Authorization") String authorization) {

        String token = tokenUtil.removeBearerStringFromToken(authorization);
        return new ResponseEntity<>(tokenUtil.isTokenExpired(token), HttpStatus.OK);
    }
}
