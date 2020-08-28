package de.berufsschule.berichtsheft.user;

import de.berufsschule.berichtsheft.util.JwtTokenUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final JwtTokenUtil tokenUtil;

    public boolean existsById(Integer id) {
        return userRepository.findById(id).isPresent();
    }

    public User findUserByToken(String authorization) {
        String token = tokenUtil.removeBearerStringFromToken(authorization);
        String username = tokenUtil.getUsernameFromToken(token);
        return userRepository.findByUsername(username);
    }

    public Integer findUserIdByToken(String authorization) {
        String token = tokenUtil.removeBearerStringFromToken(authorization);
        String username = tokenUtil.getUsernameFromToken(token);
        return userRepository.findIdByUsername(username);
    }

    void save(User user) {
        userRepository.save(user);
    }

    void deleteById(Integer id) {
        userRepository.deleteById(id);
    }
}
