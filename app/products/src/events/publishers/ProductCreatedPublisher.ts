import { AbstractPublisher, Subjects, IProductCreated } from "@weibuddies/common"

export class ProductCreatedPublisher extends AbstractPublisher<IProductCreated> {
  subject: Subjects.ProductCreated = Subjects.ProductCreated
}