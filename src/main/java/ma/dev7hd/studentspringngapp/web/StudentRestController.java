package ma.dev7hd.studentspringngapp.web;

import lombok.AllArgsConstructor;
import ma.dev7hd.studentspringngapp.entities.Student;
import ma.dev7hd.studentspringngapp.repositories.StudentRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
public class StudentRestController {
    private StudentRepository studentRepository;

    /**
     * Find all students
     * @return List<Student>
     */
    @GetMapping(path = "/students")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    /**
     * Find all students by program
     * @param programId
     * @return List<Student>
     */
    @GetMapping(path = "/students/{programId}")
    public List<Student> getStudentsByProgramId(@PathVariable String programId) {
        return studentRepository.findStudentByProgramId(programId);
    }

    /**
     * Find student by his code
     * @param code
     * @return
     */
    @GetMapping(path = "/student/{code}")
    public Optional<Student> getStudentByCode(@PathVariable String code) {
        return studentRepository.findStudentByCode(code);
    }


}
