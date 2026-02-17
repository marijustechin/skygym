import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor() {}

  async sendVerificationEmail(
    userEmail: string,
    userName: string,
    verificationTokenRaw: string,
    langCode: string,
  ) {
    console.log(verificationTokenRaw);
  }
}
