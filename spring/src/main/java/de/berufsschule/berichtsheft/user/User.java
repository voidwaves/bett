package de.berufsschule.berichtsheft.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import de.berufsschule.berichtsheft.reportEntry.ReportEntry;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Table(name = "user_table")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String firstName;
    private String lastName;
    private LocalDate beginOfApprenticeship;
    private String label;
    private String username;
    private String password;

    /**
     * Stellt eine One-to-Many Verbindung zum Berichtsheft-Objekt her
     */
    @ToString.Exclude
    @JsonManagedReference
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<ReportEntry> reportEntryList;
}
