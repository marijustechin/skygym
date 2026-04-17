import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor() {}

  async sendVerificationEmail(
    userEmail: string,
    userName: string,
    verificationTokenRaw: string,
  ) {
    console.log(verificationTokenRaw);
  }
}
