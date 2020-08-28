package de.berufsschule.berichtsheft.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByUsername(String username);

    @Query("SELECT u.id FROM User u WHERE u.username = :username")
    Integer findIdByUsername(String username);
}
