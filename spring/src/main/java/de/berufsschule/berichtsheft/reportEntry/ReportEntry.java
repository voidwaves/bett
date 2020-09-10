package de.berufsschule.berichtsheft.reportEntry;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import de.berufsschule.berichtsheft.user.User;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Table(name = "report_entry_table")
public class ReportEntry {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String content;
    private LocalDate reportDate;
    private Double workingHours;
    private String department;

    @Column(name = "user_id")
    private Integer userId;

    /**
     * Stellt eine Many-to-One Verbindung zum User-Objekt her
     */
    @ToString.Exclude
    @JsonBackReference
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @ManyToOne(targetEntity = User.class, fetch = FetchType.LAZY)
    private User user;
}
