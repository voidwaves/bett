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

    public boolean existsById(Integer id) {
        return userRepository.findById(id).isPresent();
    }

    public User findUserByToken(String authorization) {
        String username = findUsernameByToken(authorization);
        return userRepository.findByUsername(username);
    }

    public Integer findUserIdByToken(String authorization) {
        String username = findUsernameByToken(authorization);
        return userRepository.findIdByUsername(username);
    }

    private String findUsernameByToken(String authorization) {
        String token = tokenUtil.removeBearerStringFromToken(authorization);
        return tokenUtil.getUsernameFromToken(token);
    }

    public void save(User user) {
        if (!BCRYPT_PATTERN.matcher(user.getPassword()).matches()) {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        }
        userRepository.save(user);
    }

    void deleteById(Integer id) {
        userRepository.deleteById(id);
    }
}
