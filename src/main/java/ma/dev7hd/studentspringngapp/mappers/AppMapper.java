package ma.dev7hd.studentspringngapp.mappers;

import ma.dev7hd.studentspringngapp.dtos.PaymentDTO;
import ma.dev7hd.studentspringngapp.dtos.StudentDTO;
import ma.dev7hd.studentspringngapp.entities.Payment;
import ma.dev7hd.studentspringngapp.entities.Student;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class AppMapper implements IAppMapper {
    @Override
    public Student toStudent(StudentDTO studentDTO){
        Student student = new Student();
        BeanUtils.copyProperties(studentDTO, student);
        return student;
    }

    @Override
    public StudentDTO toStudentDTO(Student student){
        StudentDTO studentDTO = new StudentDTO();
        BeanUtils.copyProperties(student, studentDTO);
        return studentDTO;
    }

    @Override
    public Payment toPayment(PaymentDTO paymentDTO){
        Payment payment = new Payment();
        BeanUtils.copyProperties(paymentDTO, payment);
        return payment;
    }

    @Override
    public PaymentDTO toPaymentDTO(Payment payment){
        PaymentDTO paymentDTO = new PaymentDTO();
        BeanUtils.copyProperties(payment, paymentDTO);
        return paymentDTO;
    }
}
