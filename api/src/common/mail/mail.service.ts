import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verifyEmailMessages } from './translations/verify-email.translation';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly config: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendVerificationEmail(
    userEmail: string,
    firstName: string,
    verificationTokenRaw: string,
    lang: 'lt' | 'en' | 'ru',
  ): Promise<boolean> {
    const frontendUrl = this.config.get<string>('app.frontendUrl');
    const verificationLink = `${frontendUrl}/${lang}/registracija/pasto-patvirtinimas?token=${verificationTokenRaw}`;

    const context = {
      ...verifyEmailMessages[lang],
      verificationLink: verificationLink,
      firstName: firstName,
    };

    try {
      await this.mailerService.sendMail({
        to: userEmail,
        subject: context.subject,
        template: 'email-verify',
        context: context,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async sendContactNotification(
    name: string,
    email: string,
    message: string,
  ): Promise<boolean> {
    const recipients = this.config.getOrThrow<string[]>('contact.toEmail');

    try {
      await this.mailerService.sendMail({
        to: recipients,
        replyTo: email,
        subject: `Nauja žinutė iš ${name} - ${email}`,
        html: `
          <p><strong>Vardas:</strong> ${name}</p>
          <p><strong>El. paštas:</strong> ${email}</p>
          <p><strong>Žinutė:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
