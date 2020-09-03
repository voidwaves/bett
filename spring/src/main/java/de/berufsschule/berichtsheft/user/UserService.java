package de.berufsschule.berichtsheft.user;

import de.berufsschule.berichtsheft.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtTokenUtil tokenUtil;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

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
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    void deleteById(Integer id) {
        userRepository.deleteById(id);
    }
}
