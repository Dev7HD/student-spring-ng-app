package ma.dev7hd.studentspringngapp.web;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.AllArgsConstructor;
import ma.dev7hd.studentspringngapp.entities.Payment;
import ma.dev7hd.studentspringngapp.entities.Student;
import ma.dev7hd.studentspringngapp.enumirat.PaymentStatus;
import ma.dev7hd.studentspringngapp.enumirat.PaymentType;
import ma.dev7hd.studentspringngapp.repositories.PaymentRepository;
import ma.dev7hd.studentspringngapp.repositories.StudentRepository;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
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
     * Get all payments
     * @return List<Payment>
     */
    @GetMapping(path = "/payments")
    public List<Payment> allPayments(){
        return paymentRepository.findAll();
    }

    /**
     * Get all student payments by student code
     * @param code is a student code
     * @return List<Payment>
     */
    @GetMapping(path = "/students/{code}/payments")
    public List<Payment> allStudentPayments(@PathVariable String code) {
        return paymentRepository.findByStudentCode(code);
    }

    /**
     * Get the payment by its id
     * @param id is the payment id
     * @return Payment or null if doesn't exist
     */
    @GetMapping(path = "/payment")
    public Optional<Payment> paymentById(String id) {
        return paymentRepository.findById(id);
    }

    /**
     * Get all payments by the status
     * @param paymentStatus is the payment status
     * @return List<Payment>
     */
    @GetMapping(path = "/payments/{status}")
    public List<Payment> paymentByStatus(@PathVariable(name = "status") PaymentStatus paymentStatus) {
        return paymentRepository.findByStatus(paymentStatus);
    }

    /**
     * Get all payments knowing the type
     * @param paymentType is the payment type
     * @return List<Payment>
     */
    @GetMapping(path = "/payments/{type}")
    public List<Payment> paymentByType(@PathVariable(name = "type") PaymentType paymentType) {
        return paymentRepository.findByType(paymentType);
    }

    /**
     * Update the payment status
     * @param id is payment id
     * @param status is the new status
     * @return Optional<Payment>
     */
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

    /**
     * Add new payment
     * @param studentCode is student code
     * @param receipt is the payment amount
     * @param paymentType is the payment type
     * @param date is the payment date
     * @param file is the payment receipt
     * @return ResponseEntity<Payment>
     * @throws IOException in case exception on uploading receipt
     */
    @PostMapping(value = "/payments/new", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Payment> newPayment(String studentCode, double receipt, PaymentType paymentType, LocalDate date,
                                              @Parameter(description = "File to upload") @RequestPart(value = "file")
                                              MultipartFile file) throws IOException {
        if (!file.getContentType().equals(MediaType.APPLICATION_PDF_VALUE)) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Student> optionalStudent = studentRepository.findStudentByCode(studentCode);
        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();
            Path folderPath = Paths.get(System.getProperty("user.home"),"data","payments");
            if(!Files.exists(folderPath)) {
                Files.createDirectories(folderPath);
            }
            String fileName = UUID.randomUUID().toString();
            Path filePath = Paths.get(folderPath.toString(),fileName+".pdf");
            Files.copy(file.getInputStream(),filePath);
            Payment payment = Payment.builder()
                    .receipt(receipt)
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

    /**
     * Get the payment file
     * @param paymentId is the payment id
     * @return byte[]
     * @throws IOException in case exception on reading receipt
     */
    @GetMapping(path = "/paymentFile/{paymentId}", produces = MediaType.APPLICATION_PDF_VALUE)
    public byte[] getPaymentFile(@PathVariable String paymentId) throws IOException {
        Optional<Payment> optionalPayment = paymentRepository.findById(paymentId);
        if (optionalPayment.isPresent()) {
            return Files.readAllBytes(Path.of(URI.create(optionalPayment.get().getRecipe())));
        }
        return null;
    }

}
