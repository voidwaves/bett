package de.berufsschule.berichtsheft.user;

import de.berufsschule.berichtsheft.reportEntry.ReportEntryRepository;
import de.berufsschule.berichtsheft.reportEntry.ReportEntryService;
import de.berufsschule.berichtsheft.util.JwtTokenUtil;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.reset;

public class UserServiceTest {

    private UserService userService;
    private UserRepository userRepository;
    private JwtTokenUtil tokenUtil;

    @BeforeEach
    public void setup() {
        userRepository = mock(UserRepository.class);
        tokenUtil = mock(JwtTokenUtil.class);
        userService = new UserService(userRepository, tokenUtil);
    }

    @AfterEach
    public void after() {
        reset(userRepository, tokenUtil);
    }

    
}