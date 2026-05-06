import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from 'src/common/mail/mail.service';
import { ContactDto } from './dtos/contact.dto';
import { ApiSuccessResponse } from 'src/common/api/types/api-response.types';

@Injectable()
export class ContactService {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async submit(dto: ContactDto): Promise<ApiSuccessResponse> {
    const valid = await this.verifyTurnstile(dto.captchaToken);
    if (!valid) {
      throw new BadRequestException({
        success: false,
        code: 'TURNSTILE_VERIFICATION_FAILED',
      });
    }

    const sent = await this.mailService.sendContactNotification(
      dto.name,
      dto.email,
      dto.message,
    );

    if (!sent) {
      throw new InternalServerErrorException({
        success: false,
        code: 'CONTACT_EMAIL_FAILED',
      });
    }

    return { success: true, code: 'CONTACT_FORM_SUBMITTED' };
  }

  private async verifyTurnstile(token: string): Promise<boolean> {
    const secret = this.configService.getOrThrow<string>('turnstile.secretKey');

    try {
      const body = new URLSearchParams({ secret, response: token });
      const res = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        { method: 'POST', body },
      );
      const data = (await res.json()) as { success: boolean };
      return data.success === true;
    } catch {
      return false;
    }
  }
}
