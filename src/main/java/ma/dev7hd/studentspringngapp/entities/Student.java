package ma.dev7hd.studentspringngapp.entities;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter @Builder
public class Student {
    @Id @UuidGenerator
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    @Column(unique = true)
    private String code;
    private String programId;
    private String picture;
    @OneToMany(mappedBy = "student", fetch = FetchType.EAGER)
    private List<Payment> payments;
}
