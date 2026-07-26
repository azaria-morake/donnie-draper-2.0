declare module '@paystack/inline-js' {
  export default class PaystackPop {
    constructor();
    newTransaction(options: {
      key: string;
      email: string;
      amount: number;
      currency?: string;
      ref?: string;
      onSuccess?: (transaction: unknown) => void;
      onCancel?: () => void;
      onError?: (error: unknown) => void;
    }): void;
    resumeTransaction(accessCode: string): void;
  }
}
