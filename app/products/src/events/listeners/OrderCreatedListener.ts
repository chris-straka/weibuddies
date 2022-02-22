import { AbstractListener, Subjects, IOrderCreated } from "@weibuddies/common"
import { queueGroupName } from "../../events/listeners/queueGroupName"
import { ProductUpdatedPublisher } from "../../events/publishers/ProductUpdatedPublisher"
import { product_db } from "../../models/Product"
import { Message } from "node-nats-streaming"

export class OrderCreatedListener extends AbstractListener<IOrderCreated> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated
  queueGroupName = queueGroupName;

  async onMessage(data: IOrderCreated['data'], msg: Message) {
    const product = await product_db.getProduct(data.product.id)
    if (!product) throw new Error("[Products] Product not found")


    // product_db.set({ orderId: data.id })
    product_db.createProduct(data.id)

    await new ProductUpdatedPublisher(this.client).publish({
      id: product.id,
      price: product.price,
      title: product.title,
      userId: product.userId,
      orderId: product.orderId,
      version: product.version
    })

    msg.ack()
  }
}