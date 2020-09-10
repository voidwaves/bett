package de.berufsschule.berichtsheft.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtTokenUtil {

    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60; // 5 hours

    @Value("${jwt.secret}")
    private String secret;

    /**
     * Liest den Benutzernamen aus dem Token heraus
     * @param token Der gegebene Token
     * @return Der Benutzername des Tokens
     */
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    /**
     * Schneidet das Wort "Bearer", welches immer im Header vor dem Token mitgegeben wird
     * @param token Der Token, der angepasst werden soll
     * @return Nur der reine Token
     */
    public String removeBearerStringFromToken(String token) {
        if (token.startsWith("Bearer ")) {
            return token.substring(7);
        }
        return token;
    }

    /**
     * Liest aus dem Token heraus, wann dieser nicht mehr gültig ist
     * @param token Der gegebene Token
     * @return Das {@link Date}, wann der Token nicht mehr gültig ist (siehe {@link JwtTokenUtil#JWT_TOKEN_VALIDITY})
     */
    private Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    /**
     * Methode, die dem Token gewünschte Infos ausliest
     * @param token Der gegebene Token
     * @param claimsResolver Welche der Claims aus dem Token gelesen werden sollen
     * @return Was aus dem Token gelesen wurde (im jeweils richtigen Format)
     */
    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Liest alle aus dem Token herauslesbare Infos raus
     * @param token Der gegebene Token
     * @return {@link Claims} Objekt, mit allen Infos die man aus dem Token lesen kann
     */
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    /**
     * Prüft, ob der Token noch gültig ist
     * @param token Der gegebene Token
     * @return true/false
     */
    public Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    /**
     * Erstellt mit den gegebenen {@link UserDetails} einen Token
     * @param userDetails Der Benutzer, der einen Token erstellt
     * @return Der Token-String
     */
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return doGenerateToken(claims, userDetails.getUsername());
    }

    /**
     * Baut den Token
     * @param claims HashMap in der Infos zu dem Token gespeichert werden
     * @param subject Der Benutzername des Users
     * @return Der Token-String
     */
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    /**
     * Prüft, ob der gegebene Benutzer und Token validiert werden können
     * @param token Der gegebene Token
     * @param userDetails Der gegebene Benutzer
     * @return true/false
     */
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}