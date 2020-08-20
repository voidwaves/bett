package de.berufsschule.berichtsheft.user;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User findById(Integer id) {
        return userRepository.findById(id).orElse(new User());
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
}
