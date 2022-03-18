import { IPaymentDatabase } from './interface';
import { postgresDb } from './postgres';

const PaymentDatabase = (db: IPaymentDatabase): IPaymentDatabase => ({
  async createPayment(orderId: string, paymentId: string) {
    return db.createPayment(orderId, paymentId);
  },
});

export const paymentDb = PaymentDatabase(postgresDb);
