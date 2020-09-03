package de.berufsschule.berichtsheft.jwt;

import de.berufsschule.berichtsheft.user.User;
import de.berufsschule.berichtsheft.user.UserRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static de.berufsschule.berichtsheft.TestUtil.*;
import static de.berufsschule.berichtsheft.user.UserTestUtil.createValidUser;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class JwtUserDetailServiceTest {

    @InjectMocks
    private JwtUserDetailsService jwtUserDetailsService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @AfterEach
    public void after() {
        reset(userRepository, bCryptPasswordEncoder);
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
        verifyNoMoreInteractions(userRepository, bCryptPasswordEncoder);
    }

    @Test
    public void testSave() {
        when(bCryptPasswordEncoder.encode("asd")).thenReturn(TEST_ENCODED_PASSWORD);
        jwtUserDetailsService.save(createValidUser(false));
        verify(bCryptPasswordEncoder).encode("asd");
        verify(userRepository).save(any(User.class));
        verifyNoMoreInteractions(userRepository, bCryptPasswordEncoder);
    }
}
