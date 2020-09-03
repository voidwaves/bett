package de.berufsschule.berichtsheft.user;

import de.berufsschule.berichtsheft.util.JwtTokenUtil;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static de.berufsschule.berichtsheft.TestUtil.*;
import static de.berufsschule.berichtsheft.user.UserTestUtil.createValidUser;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

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

    @Test
    public void testExistsById() {
        when(userRepository.findById(TEST_ID)).thenReturn(Optional.of(createValidUser(false)));
        when(userRepository.findById(TEST_ID_2)).thenReturn(Optional.empty());
        boolean result = userService.existsById(TEST_ID);
        boolean result2 = userService.existsById(TEST_ID_2);
        assertThat(result).isTrue();
        assertThat(result2).isFalse();
        verify(userRepository).findById(TEST_ID);
        verify(userRepository).findById(TEST_ID_2);
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    public void testFindUserByToken() {
        when(tokenUtil.removeBearerStringFromToken(TEST_AUTHORIZATION)).thenReturn(TEST_TOKEN);
        when(tokenUtil.getUsernameFromToken(TEST_TOKEN)).thenReturn(TEST_USERNAME);
        when(userRepository.findByUsername(TEST_USERNAME)).thenReturn(createValidUser(true));
        User result = userService.findUserByToken(TEST_AUTHORIZATION);
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(1);
        verify(tokenUtil).removeBearerStringFromToken(TEST_AUTHORIZATION);
        verify(tokenUtil).getUsernameFromToken(TEST_TOKEN);
        verify(userRepository).findByUsername(TEST_USERNAME);
        verifyNoMoreInteractions(tokenUtil, userRepository);
    }

    @Test
    public void testFindUserIdByToken() {
        when(tokenUtil.removeBearerStringFromToken(TEST_AUTHORIZATION)).thenReturn(TEST_TOKEN);
        when(tokenUtil.getUsernameFromToken(TEST_TOKEN)).thenReturn(TEST_USERNAME);
        when(userRepository.findIdByUsername(TEST_USERNAME)).thenReturn(TEST_ID);
        Integer result = userService.findUserIdByToken(TEST_AUTHORIZATION);
        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(TEST_ID);
        verify(tokenUtil).removeBearerStringFromToken(TEST_AUTHORIZATION);
        verify(tokenUtil).getUsernameFromToken(TEST_TOKEN);
        verify(userRepository).findIdByUsername(TEST_USERNAME);
        verifyNoMoreInteractions(tokenUtil, userRepository);
    }

    @Test
    public void testSave() {
        User user = createValidUser(false);
        userService.save(user);
        verify(userRepository).save(user);
        verifyNoMoreInteractions(userRepository);
    }

    @Test
    public void testDeleteById() {
        userService.deleteById(1);
        verify(userRepository).deleteById(1);
        verifyNoMoreInteractions(userRepository);
    }
}