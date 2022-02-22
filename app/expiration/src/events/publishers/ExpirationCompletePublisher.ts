import { Subjects, AbstractPublisher, IExpirationComplete } from '@weibuddies/common';

export class ExpirationCompletePublisher extends AbstractPublisher<IExpirationComplete> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
