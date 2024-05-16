export interface Payment {
  id: string;
  date: string;
  amount: number;
  type: string;
  status: string;
  receipt: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  code: string;
  programId: string;
}

export enum PaymentType{
  CASH,
  CHECK,
  TRANSFER,
  DEPOSIT
}

export enum PaymentStatus{
  CREATED,
  VALIDATED,
  REJECTED
}
