// import { Producer } from 'kafkajs';

// Set the orderId to undefined
// export const orderCancelledHandler = async (producer: Producer) => {
// subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
// queueGroupName = queueGroupName;

// async onMessage(data: IOrderCancelled['data'], msg: Message) {
//   const order = await Order.findOne({
//     _id: data.id,
//     version: data.version - 1,
//   });

//   if (!order) throw new Error('[Payments] Order not found');

//   order.set({ status: OrderStatus.Cancelled });
//   await order.save();

//   msg.ack();
// }
// };

// Set the orderId to whatever was provided
// export const orderCreatedHandler = async (producer: Producer) => {
// subject: Subjects.OrderCreated = Subjects.OrderCreated;
// queueGroupName = queueGroupName;

// async onMessage(data: IOrderCreated['data'], msg: Message) {
//   const order = Order.build({
//     id: data.id,
//     price: data.product.price,
//     status: data.status,
//     userId: data.userId,
//     version: data.version,
//   });
//   await order.save();
//   msg.ack();
// }
// };
