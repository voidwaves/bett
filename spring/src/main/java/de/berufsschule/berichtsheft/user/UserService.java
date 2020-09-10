package de.berufsschule.berichtsheft.user;

import de.berufsschule.berichtsheft.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtTokenUtil tokenUtil;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final Pattern BCRYPT_PATTERN = Pattern
            .compile("\\A\\$2(a|y|b)?\\$(\\d\\d)\\$[./0-9A-Za-z]{53}");

    /**
     * Prüft ob ein User mit gegebener ID existiert
     * @param id Die ID, die gesucht wird
     * @return true/false
     */
    public boolean existsById(Integer id) {
        return userRepository.findById(id).isPresent();
    }

    /**
     * Gibt das User-Objekt zurück, welches zum angegebenen Token gehört
     * @param authorization Der Token, aus dem man den Benutzernamen rauslesen kann
     * @return Das User-Objekt
     */
    public User findUserByToken(String authorization) {
        String username = findUsernameByToken(authorization);
        return userRepository.findByUsername(username);
    }

    /**
     * Gibt die ID des Users zurück, welches zum angegebenen Token gehört
     * @param authorization Der Token, aus dem man den Benutzernamen rauslesen kann
     * @return Id des Users
     */
    public Integer findUserIdByToken(String authorization) {
        String username = findUsernameByToken(authorization);
        return userRepository.findIdByUsername(username);
    }

    /**
     * Liest den Benutzernamen aus dem Token heraus und gibt es aus
     * @param authorization Der Token, aus dem man den Benutzernamen rauslesen kann
     * @return Den Benutzernamen des Users
     */
    private String findUsernameByToken(String authorization) {
        String token = tokenUtil.removeBearerStringFromToken(authorization);
        return tokenUtil.getUsernameFromToken(token);
    }

    /**
     * Überschreibt einen Eintrag in der Datenbank. Prüft, ob das angegebene Passwort bereits
     * verschlüsselt ist, wenn nicht, dann macht er es. Damit werden geänderte Passwörter sofort verschlüsselt.
     * @param user Der Eintrag, der überschrieben werden soll
     */
    public void save(User user) {
        if (!BCRYPT_PATTERN.matcher(user.getPassword()).matches()) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        }
        userRepository.save(user);
    }

    /**
     * Löscht einen Eintrag aus der Datenbank mit gegebener ID
     * @param id ID des zu löschenden Objekts
     */
    void deleteById(Integer id) {
        userRepository.deleteById(id);
    }
}
