export interface UpdatePay {
  mpPaymentMethod: string;
  mpPaymentId?: string;
  mpState: string;
  approvalDate: Date | null;
}

export interface UpdatePayRefund {
    mpState: string;
    approvalDate: null;
}