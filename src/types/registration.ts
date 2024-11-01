export default interface Registration {
  admissionDate: string;
  email: string;
  employeeName: string;
  status?: string;
  cpf: string;
}

export enum RegistrationStatus {
  REVIEW = "REVIEW",
  APPROVED = "APPROVED",
  REPROVED = "REPROVED",
}
