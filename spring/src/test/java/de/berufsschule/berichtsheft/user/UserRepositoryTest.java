package de.berufsschule.berichtsheft.user;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static de.berufsschule.berichtsheft.TestUtil.TEST_USERNAME;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    public void testFindByUsername() {
        final User result = userRepository.findByUsername(TEST_USERNAME);
        assertThat(result).isNotNull();
        assertThat(result.getUsername()).isEqualTo(TEST_USERNAME);
    }

    @Test
    public void testFindIdByUsername() {
        final Integer result = userRepository.findIdByUsername(TEST_USERNAME);
        assertThat(result).isNotNull();
        assertThat(result).isEqualTo(2);
    }
}
