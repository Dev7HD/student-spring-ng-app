package ma.dev7hd.studentspringngapp.dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ma.dev7hd.studentspringngapp.enumirat.ProgramId;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO {
    private String firstName;
    private String lastName;
    private String email;
    private String code;
    private ProgramId programId;
}
