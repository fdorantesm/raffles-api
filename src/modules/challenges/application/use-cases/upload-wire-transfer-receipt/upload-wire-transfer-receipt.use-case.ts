import { ConfigService } from '@nestjs/config';
import { S3Service } from './../../../../shared/services/s3.service';
import { FileService } from './../../../../shared/services/file.service';
import {
  NotFoundException,
  Injectable,
  ConflictException,
} from '@nestjs/common';
import { File } from '@thp/common/types/general/file.type';
import { RegistrationsService } from './../../../infrastructure/database/services/registrations.service';

@Injectable()
export class UploadWireTransferReceiptUseCase {
  constructor(
    private readonly registrationsService: RegistrationsService,
    private readonly fileService: FileService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
  ) {}

  public async exec(userId, uuid: string, file: File) {
    const registration = await this.registrationsService.findOne({
      uuid,
      userId,
    });

    if (!registration) {
      throw new NotFoundException('resource.not_found');
    }

    if (registration.wireTransferReceiptUrl) {
      throw new ConflictException('registrations.recepit_already_exists');
    }

    const repository = this.configService.get<string>('storage.repository');
    const filename = this.fileService.makeSlug(file);
    const keyPath = `receipts/${filename}`;
    const fileUrl = await this.s3Service.upload(
      keyPath,
      file.buffer,
      repository,
    );

    await this.registrationsService.updateOne(
      { uuid },
      {
        wireTransferReceiptUrl: fileUrl,
      },
    );

    return { ...registration, wireTransferReceiptUrl: fileUrl };
  }
}
