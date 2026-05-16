import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ContactDto } from './dtos/contact.dto';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'Submit a contact form message' })
  @ApiBadRequestResponse({
    description: 'Validation failed',
    schema: {
      example: { success: false, code: 'VALIDATION_FAILED', details: ['...'] },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Email sending failed',
    schema: {
      example: { success: false, code: 'CONTACT_EMAIL_FAILED' },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Message sent successfully',
    schema: {
      example: { success: true, code: 'CONTACT_FORM_SUBMITTED' },
    },
  })
  @Throttle({ default: { limit: 3, ttl: 600_000 } })
  @HttpCode(200)
  @Post()
  submit(@Body() dto: ContactDto) {
    return this.contactService.submit(dto);
  }
}
