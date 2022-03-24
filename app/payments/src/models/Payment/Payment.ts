import { IPaymentDatabase } from './interface';
import { postgresDb } from './postgres';

const PaymentDatabase = (db: IPaymentDatabase): IPaymentDatabase => ({
  createPayment(orderId, paymentId) {
    return db.createPayment(orderId, paymentId);
  },
});

export const paymentDb = PaymentDatabase(postgresDb);
