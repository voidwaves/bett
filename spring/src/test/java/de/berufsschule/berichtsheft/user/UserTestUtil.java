package de.berufsschule.berichtsheft.user;

import java.time.LocalDate;

import static de.berufsschule.berichtsheft.TestUtil.TEST_USERNAME;

public class UserTestUtil {

    static User createValidUser(boolean withId) {
        User user = new User();
        if (withId) user.setId(1);
        user.setFirstName("asd");
        user.setLastName("asd");
        user.setUsername("asd");
        user.setPassword("asd");
        user.setBeginOfApprenticeship(LocalDate.of(2018, 7, 31));
        user.setLabel("asd");
        return user;
    }

    static User createInvalidUser(boolean withId) {
        User user = new User();
        if (withId) user.setId(1);
        user.setFirstName("asd");
        user.setLastName("asd");
        user.setUsername(TEST_USERNAME);
        user.setPassword("asd");
        user.setBeginOfApprenticeship(LocalDate.of(2018, 7, 31));
        user.setLabel("asd");
        return user;
    }
}
