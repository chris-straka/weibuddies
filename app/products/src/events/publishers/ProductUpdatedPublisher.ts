import { AbstractPublisher, Subjects, IProductUpdated } from "@weibuddies/common"

export class ProductUpdatedPublisher extends AbstractPublisher<IProductUpdated> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated
}