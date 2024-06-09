package ma.dev7hd.studentspringngapp.services;

import lombok.AllArgsConstructor;
import ma.dev7hd.studentspringngapp.dtos.StudentDTO;
import ma.dev7hd.studentspringngapp.entities.Student;
import ma.dev7hd.studentspringngapp.mappers.IAppMapper;
import ma.dev7hd.studentspringngapp.repositories.StudentRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class StudentService {
    private StudentRepository studentRepository;
    private PaymentService paymentService;
    private IAppMapper iAppMapper;

    public ResponseEntity<StudentDTO> addStudent(StudentDTO studentDTO){
        if(studentDTO != null){
            Student student = iAppMapper.toStudent(studentDTO);
            studentRepository.save(student);
            return ResponseEntity.ok(studentDTO);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    public ResponseEntity<StudentDTO> editStudent(StudentDTO studentDTO){
        Optional<Student> optionalStudent = studentRepository.findStudentByCode(studentDTO.getCode());
        if(optionalStudent.isPresent()){
            Student student = optionalStudent.get();
            student.setEmail(studentDTO.getEmail());
            student.setFirstName(studentDTO.getFirstName());
            student.setLastName(studentDTO.getLastName());
            student.setProgramId(studentDTO.getProgramId());
            return ResponseEntity.ok(iAppMapper.toStudentDTO(studentRepository.save(student)));
        } else {
            return null;
        }
    }

    public ResponseEntity deleteStudent(String code){
        Student student = studentRepository.findStudentByCode(code).orElse(null);
        if (student != null){
            paymentService.deleteStudentPayments(student.getId());
            studentRepository.deleteById(student.getId());
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
