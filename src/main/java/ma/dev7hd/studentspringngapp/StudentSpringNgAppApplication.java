package ma.dev7hd.studentspringngapp;

import ma.dev7hd.studentspringngapp.entities.Payment;
import ma.dev7hd.studentspringngapp.entities.Student;
import ma.dev7hd.studentspringngapp.enumirat.PaymentStatus;
import ma.dev7hd.studentspringngapp.enumirat.PaymentType;
import ma.dev7hd.studentspringngapp.enumirat.ProgramId;
import ma.dev7hd.studentspringngapp.repositories.PaymentRepository;
import ma.dev7hd.studentspringngapp.repositories.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class StudentSpringNgAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(StudentSpringNgAppApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository, PaymentRepository paymentRepository) {
        return args -> {
            studentRepository.save(Student.builder()
                            .firstName("Oussama")
                            .lastName("Bissi")
                            .code("11223344")
                            .email("oussama.bissi@edu.ma")
                            .programId(Math.random() > 0.2 ? ProgramId.ISI
                                    : Math.random() > 0.5 ? ProgramId.GI
                                    : Math.random() > 0.8 ? ProgramId.MF
                                    : ProgramId.IIR)
                    .build());
            studentRepository.save(Student.builder()
                    .firstName("Yassin")
                    .lastName("FADIL")
                    .code("1425161765")
                    .email("yassin.fadil@edu.ma")
                    .programId(Math.random() > 0.2 ? ProgramId.ISI
                            : Math.random() > 0.5 ? ProgramId.GI
                            : Math.random() > 0.8 ? ProgramId.MF
                            : ProgramId.IIR)
                    .build());
            studentRepository.save(Student.builder()
                    .firstName("Asmae")
                    .lastName("Bennani")
                    .code("44556677")
                    .email("asmae.bennani@edu.ma")
                    .programId(Math.random() > 0.2 ? ProgramId.ISI
                            : Math.random() > 0.5 ? ProgramId.GI
                            : Math.random() > 0.8 ? ProgramId.MF
                            : ProgramId.IIR)
                    .build());
            studentRepository.save(Student.builder()
                    .firstName("Hanan")
                    .lastName("Moussa")
                    .code("1627365487")
                    .email("hanan.moussa@edu.ma")
                    .programId(Math.random() > 0.2 ? ProgramId.ISI
                            : Math.random() > 0.5 ? ProgramId.GI
                            : Math.random() > 0.8 ? ProgramId.MF
                            : ProgramId.IIR)
                    .build());
            studentRepository.findAll().forEach(student -> {
                for (int i = 0; i < 4; i++) {
                    double random = Math.random();
                    Payment payment = Payment.builder()
                            .amount((int) (random * 10000))
                            .student(student)
                            .date(LocalDate.now())
                            .type(random >= 0.75 ? PaymentType.CASH : random >= 0.5 ? PaymentType.CHECK : random >= 0.25 ? PaymentType.DEPOSIT : PaymentType.TRANSFER)
                            .status(random >= 0.66 ? PaymentStatus.VALIDATED : random >= 0.33 ? PaymentStatus.CREATED : PaymentStatus.REJECTED )
                            .receipt("./static/recipes").build();
                    paymentRepository.save(payment);
                }
            });
        };
    }

}
