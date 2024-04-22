package ma.dev7hd.studentspringngapp.web;

import lombok.AllArgsConstructor;
import ma.dev7hd.studentspringngapp.entities.Payment;
import ma.dev7hd.studentspringngapp.entities.Student;
import ma.dev7hd.studentspringngapp.enumirat.PaymentStatus;
import ma.dev7hd.studentspringngapp.enumirat.PaymentType;
import ma.dev7hd.studentspringngapp.repositories.PaymentRepository;
import ma.dev7hd.studentspringngapp.repositories.StudentRepository;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class PaymentRestController {
    private PaymentRepository paymentRepository;
    private StudentRepository studentRepository;

    /**
     * Find all payments
     * @return List<Payment>
     */
    @GetMapping(path = "/payments")
    public List<Payment> allPayments(){
        return paymentRepository.findAll();
    }

    /**
     * Find all student payments by student code
     * @param code
     * @return List<Payment>
     */
    @GetMapping(path = "/students/{code}/payments")
    public List<Payment> allStudentPayments(@PathVariable String code) {
        return paymentRepository.findByStudentCode(code);
    }

    /**
     * Find the payment by its id
     * @param id
     * @return Payment or null if doesn't exist
     */
    @GetMapping(path = "/payment")
    public Optional<Payment> paymentById(@RequestParam(required = true) String id) {
        return paymentRepository.findById(id);
    }

    /**
     * Find all payments knowing the status
     * @param paymentStatus PaymentStatus
     * @return List<Payment>
     */
    @GetMapping(path = "/payments/{status}")
    public List<Payment> paymentByStatus(@PathVariable(name = "status") PaymentStatus paymentStatus) {
        return paymentRepository.findByStatus(paymentStatus);
    }

    /**
     * Find all payments knowing the type
     * @param paymentType PaymentStatus
     * @return List<Payment>
     */
    @GetMapping(path = "/payments/{type}")
    public List<Payment> paymentByType(@PathVariable(name = "type") PaymentType paymentType) {
        return paymentRepository.findByType(paymentType);
    }

    @PutMapping("/payments/{id}")
    public ResponseEntity<Payment> paymentStatusUpdate(@PathVariable String id, @RequestParam PaymentStatus status) {
        Optional<Payment> optionalPayment = paymentRepository.findById(id);
        if (optionalPayment.isPresent()) {
            Payment payment = optionalPayment.get();
            payment.setStatus(status);
            payment = paymentRepository.save(payment);
            return ResponseEntity.ok(payment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/payments/new",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Payment> newPayment(String studentCode, double amount, PaymentType paymentType, LocalDate date, MultipartFile file) throws IOException {
        if (!file.getContentType().equals(MediaType.APPLICATION_PDF_VALUE)) {
            return ResponseEntity.badRequest().build(); // Or throw a custom exception
        }

        Optional<Student> optionalStudent = studentRepository.findStudentByCode(studentCode);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            Path folderName = Paths.get(System.getProperty("user.home"),"data","payments");
            if(!Files.exists(folderName)) {
                Files.createDirectories(folderName);
            }
            String fileName = UUID.randomUUID().toString();
            Path filePath = Paths.get(folderName.toString(),fileName+".pdf");
            Files.copy(file.getInputStream(),filePath);
            Payment payment = Payment.builder()
                    .amount(amount)
                    .student(student)
                    .type(paymentType)
                    .date(date)
                    .status(PaymentStatus.CREATED)
                    .recipe(filePath.toUri().toString())
            .build();
            paymentRepository.save(payment);
            return ResponseEntity.ok(payment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
