import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RegistrationsService } from 'src/modules/challenges/infrastructure/database/services/registrations.service';
import { S3Service } from 'src/modules/shared/services/s3.service';

@Injectable()
export class ListRegistrationsByUserIdUseCase {
  constructor(
    private readonly registrationsService: RegistrationsService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  public async exec(userId: string) {
    const bucket = this.configService.get<string>('storage.repository');
    const registrations =
      await this.registrationsService.findRegistrationsByUserId(userId);

    for (const registration of registrations) {
      if (registration.wireTransferReceiptUrl) {
        const key = registration.wireTransferReceiptUrl.replace(
          /^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//,
          '',
        );

        registration.wireTransferReceiptUrl = await this.s3Service.getSignedUrl(
          key,
          bucket,
        );
      }
    }

    return registrations;
  }
}
