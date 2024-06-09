package ma.dev7hd.studentspringngapp.web;

import lombok.AllArgsConstructor;
import ma.dev7hd.studentspringngapp.dtos.StudentDTO;
import ma.dev7hd.studentspringngapp.entities.Student;
import ma.dev7hd.studentspringngapp.enumirat.ProgramId;
import ma.dev7hd.studentspringngapp.repositories.StudentRepository;
import ma.dev7hd.studentspringngapp.services.StudentService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@AllArgsConstructor
public class StudentRestController {
    private StudentRepository studentRepository;
    private StudentService studentService;

    /**
     * Find all students
     * @return List<Student>
     */
    @GetMapping(path = "/students/all")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    /**
     * Find all students by program
     * @param programId is student program id
     * @return List<Student>
     */
    @GetMapping(path = "/student/program/{programId}")
    public List<Student> getStudentsByProgramId(@PathVariable ProgramId programId) {
        return studentRepository.findStudentByProgramId(programId);
    }

    /**
     * Find student by his code
     * @param code is student code
     * @return Optional<Student>
     */
    @GetMapping(path = "/student/{code}")
    public Optional<Student> getStudentByCode(@PathVariable String code) {
        return studentRepository.findStudentByCode(code);
    }

    /**
     * Add new student
     * @param studentDTO
     * @return ResponseEntity<StudentDTO>
     */
    @PostMapping(path = "/students/new")
    public ResponseEntity<StudentDTO> newStudent(@RequestBody StudentDTO studentDTO){
        return studentService.addStudent(studentDTO);
    }

    /**
     * Update student
     * @param studentDTO
     * @return ResponseEntity<StudentDTO>
     */
    @PutMapping("/student/edit")
    public ResponseEntity<StudentDTO> updateStudent(@RequestBody StudentDTO studentDTO){
        return studentService.editStudent(studentDTO);
    }

    @DeleteMapping("/student/delete/{code}")
    public ResponseEntity deleteStudent(@PathVariable String code){
        return studentService.deleteStudent(code);
    }

}
