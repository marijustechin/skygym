import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/common/api/exceptions/app.exception';

export class UserRegistrationEmailInUseException extends AppException {
  constructor() {
    super(HttpStatus.CONFLICT, 'USER_REGISTRATION_EMAIL_IN_USE');
  }
}
