import { Injectable } from '@nestjs/common';

import { RegistrationEntity } from '../../../domain/entities/registration.entity';
import { RegistrationsRepository } from '../repositories/registrations.repository';

@Injectable()
export class RegistrationsService {
  constructor(
    private readonly registrationsRepository: RegistrationsRepository,
  ) {}

  public async find(
    filter: Partial<RegistrationEntity>,
  ): Promise<RegistrationEntity[]> {
    return await this.registrationsRepository.find(filter);
  }

  public async create(
    registrationEntity: RegistrationEntity,
  ): Promise<RegistrationEntity> {
    return await this.registrationsRepository.create(registrationEntity);
  }

  public async findOne(
    registrationEntity: Partial<RegistrationEntity>,
  ): Promise<RegistrationEntity> {
    return await this.registrationsRepository.findOne(registrationEntity);
  }

  public async findByChallengeId(
    challengeId: string,
  ): Promise<RegistrationEntity[]> {
    return await this.find({ challengeId });
  }

  public findReportByChallengeId(
    challengeId: string,
  ): Promise<RegistrationEntity[]> {
    return this.registrationsRepository.findRegistrationWithAllData({
      challengeId,
    });
  }

  public async updateOne(
    filter: Partial<RegistrationEntity>,
    data: Partial<RegistrationEntity>,
  ) {
    await this.registrationsRepository.updateOne(filter, data);
    return this.findOne(filter);
  }

  public async findPendingRegistrationForDate(
    userId: string,
    date: Date,
  ): Promise<RegistrationEntity> {
    return this.registrationsRepository.findPendingRegistrationForDate(
      userId,
      date,
    );
  }

  public async findActiveRegistration(
    userId: string,
    date: Date,
  ): Promise<RegistrationEntity> {
    return this.registrationsRepository.findActiveRegistration(userId, date);
  }

  public findRegistrationsByUserId(
    userId: string,
  ): Promise<RegistrationEntity[]> {
    return this.registrationsRepository.findRegistrationsByUserId(userId);
  }

  public getRegistrationWithChallengeByUserIdAndChallengeId(
    userId: string,
    challengeId: string,
  ): Promise<RegistrationEntity> {
    return this.registrationsRepository.getRegistrationWithChallengeByUserIdAndChallengeId(
      userId,
      challengeId,
    );
  }
}
