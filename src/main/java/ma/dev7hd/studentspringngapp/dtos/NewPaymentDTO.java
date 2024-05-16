package ma.dev7hd.studentspringngapp.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import ma.dev7hd.studentspringngapp.enumirat.PaymentType;

import java.time.LocalDate;

@Getter @Setter @AllArgsConstructor
public class NewPaymentDTO {
    private String studentCode;
    private double amount;
    private PaymentType paymentType;
    private LocalDate date;
}
