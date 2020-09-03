package de.berufsschule.berichtsheft.jwt;

import de.berufsschule.berichtsheft.user.User;
import de.berufsschule.berichtsheft.user.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;

import static de.berufsschule.berichtsheft.TestUtil.TEST_USERNAME;
import static de.berufsschule.berichtsheft.user.UserTestUtil.createValidUser;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class JwtUserDetailServiceTest {


    private JwtUserDetailsService jwtUserDetailsService;
    private UserRepository userRepository;

    @BeforeEach
    public void setup() {
        userRepository = mock(UserRepository.class);
        jwtUserDetailsService = new JwtUserDetailsService(userRepository);
    }

    @AfterEach
    public void after() {
        reset(userRepository);
    }

    @Test
    public void testLoadUserByUsername() {
        User user = createValidUser(true);
        when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(user);
        final UserDetails result = jwtUserDetailsService.loadUserByUsername(TEST_USERNAME);
        assertThat(result).isNotNull();
        assertThat(result.getUsername()).isEqualTo(user.getUsername());
        assertThat(result.getPassword()).isEqualTo(user.getPassword());
        verify(userRepository).findByUsername(TEST_USERNAME);
        verifyNoMoreInteractions(userRepository);
    }
}
