package de.berufsschule.berichtsheft.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     * Gibt das User-Objekt zum angebenenen Usernamen (Usernames sind einzigartig)
     * @param username Der Benutzername dessen Objekt abgefragt wird
     * @return Das User-Objekt
     */
    User findByUsername(String username);

    /**
     * Gibt die ID der abgefragten Benutzers
     * @param username Der Benutzername dessen ID abgefragt wird
     * @return Die ID des Benutzers
     */
    @Query("SELECT u.id FROM User u WHERE u.username = :username")
    Integer findIdByUsername(String username);
}
