package ma.dev7hd.studentspringngapp.mappers;

import ma.dev7hd.studentspringngapp.dtos.PaymentDTO;
import ma.dev7hd.studentspringngapp.dtos.StudentDTO;
import ma.dev7hd.studentspringngapp.entities.Payment;
import ma.dev7hd.studentspringngapp.entities.Student;

public interface IAppMapper {
    Student toStudent(StudentDTO studentDTO);

    StudentDTO toStudentDTO(Student student);

    Payment toPayment(PaymentDTO paymentDTO);

    PaymentDTO toPaymentDTO(Payment payment);
}
