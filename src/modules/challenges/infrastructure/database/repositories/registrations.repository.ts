import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as first from 'lodash/first';

import { RegistrationEntity } from '../../../domain/entities/registration.entity';
import { RegistrationModel } from '../models/registration.model';
import { RegistrationWithChallenge } from '../types/registration-with-challenge.type';

@Injectable()
export class RegistrationsRepository {
  constructor(
    @InjectModel(RegistrationModel.name)
    private readonly registrationModel: Model<RegistrationModel>,
  ) {}

  public async find(
    filter: Partial<RegistrationEntity>,
  ): Promise<RegistrationEntity[]> {
    const registrations = await this.registrationModel.find(filter);

    return registrations.map((registration) =>
      RegistrationEntity.create({
        uuid: registration.uuid,
        userId: registration.userId,
        challengeId: registration.challengeId,
        registeredAt: registration.registeredAt,
        bmi: registration.bmi,
        withProtein: registration.withProtein,
        height: registration.height,
        weight: registration.weight,
        isActive: registration.isActive,
        wireTransferReceiptUrl: registration.wireTransferReceiptUrl,
        challenge: undefined,
      }),
    );
  }

  public async findRegistrationWithAllData(
    filter: Partial<RegistrationEntity>,
  ): Promise<RegistrationEntity[]> {
    const registrations = await this.registrationModel.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: 'uuid',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $lookup: {
          from: 'challenges',
          localField: 'challengeId',
          foreignField: 'uuid',
          as: 'challenge',
        },
      },
      {
        $unwind: '$challenge',
      },
      {
        $project: {
          'user._id': 0,
          'user.uuid': 0,
          'user.password': 0,
          'user.scopes': 0,
          'user.__v': 0,
          'user.createdAt': 0,
          'user.updatedAt': 0,
          'challenge._id': 0,
          'challenge.createdAt': 0,
          'challenge.updatedAt': 0,
          'challenge.__v': 0,
        },
      },
    ]);

    return registrations.map((registration) =>
      RegistrationEntity.create({
        uuid: registration.uuid,
        userId: registration.userId,
        challengeId: registration.challengeId,
        registeredAt: registration.registeredAt,
        bmi: registration.bmi,
        withProtein: registration.withProtein,
        isActive: registration.isActive,
        challenge: registration.challenge,
        wireTransferReceiptUrl: registration.wireTransferReceiptUrl,
        user: registration.user,
        height: registration.height,
        weight: registration.weight,
      }),
    );
  }

  public async create(
    registrationEntity: RegistrationEntity,
  ): Promise<RegistrationEntity> {
    const registration =
      await this.registrationModel.create<RegistrationEntity>(
        registrationEntity,
      );

    if (registration) {
      return RegistrationEntity.create({
        uuid: registration.uuid,
        userId: registration.userId,
        challengeId: registration.challengeId,
        registeredAt: registration.registeredAt,
        bmi: registration.bmi,
        withProtein: registration.withProtein,
        height: registration.height,
        weight: registration.weight,
        isActive: registration.isActive,
        wireTransferReceiptUrl: registration.wireTransferReceiptUrl,
        challenge: undefined,
      });
    }
  }

  public async findOne(
    registrationEntity: Partial<RegistrationEntity>,
  ): Promise<RegistrationEntity> {
    const registration = await this.registrationModel.findOne(
      registrationEntity,
    );
    if (registration) {
      return RegistrationEntity.create({
        uuid: registration.uuid,
        userId: registration.userId,
        challengeId: registration.challengeId,
        registeredAt: registration.registeredAt,
        bmi: registration.bmi,
        withProtein: registration.withProtein,
        height: registration.height,
        weight: registration.weight,
        isActive: registration.isActive,
        wireTransferReceiptUrl: registration.wireTransferReceiptUrl,
        challenge: undefined,
      });
    }
  }

  public async findByChallengeId(
    challengeId: string,
  ): Promise<RegistrationEntity[]> {
    const registrations = await this.find({ challengeId });
    return registrations;
  }

  public async updateOne(
    filter: Partial<RegistrationEntity>,
    data: Partial<RegistrationEntity>,
  ) {
    await this.registrationModel.updateOne(filter, data).exec();
    return this.findOne(filter);
  }

  public async findPendingRegistrationForDate(userId: string, date: Date) {
    const registrations = await this.registrationModel.aggregate([
      {
        $match: { userId },
      },
      {
        $lookup: {
          from: 'challenges',
          localField: 'challengeId',
          foreignField: 'uuid',
          as: 'challenge',
        },
      },
      { $unwind: '$challenge' },
      {
        $project: {
          uuid: true,
          userId: true,
          challengeId: true,
          registeredAt: true,
          isActive: true,
          'challenge.uuid': true,
          'challenge.startsAt': true,
        },
      },
      {
        $sort: {
          registeredAt: -1,
        },
      },
      {
        $match: {
          'challenge.startsAt': {
            $gte: date,
          },
        },
      },
      {
        $limit: 1,
      },
    ]);

    const registration: RegistrationWithChallenge = first(registrations);

    if (registration) {
      return RegistrationEntity.create({
        uuid: registration.uuid,
        userId: userId,
        challengeId: registration.challenge.uuid,
        registeredAt: registration.registeredAt,
        bmi: registration.bmi,
        withProtein: registration.withProtein,
        height: registration.height,
        weight: registration.weight,
        isActive: registration.isActive,
        wireTransferReceiptUrl: registration.wireTransferReceiptUrl,
        challenge: undefined,
      });
    }
  }

  public async findActiveRegistration(userId: string, date: Date) {
    const registrations = await this.registrationModel.aggregate([
      {
        $match: { userId },
      },
      {
        $lookup: {
          from: 'challenges',
          localField: 'challengeId',
          foreignField: 'uuid',
          as: 'challenge',
        },
      },
      { $unwind: '$challenge' },
      {
        $project: {
          uuid: true,
          userId: true,
          challengeId: true,
          registeredAt: true,
          isActive: true,
          'challenge.uuid': true,
          'challenge.startsAt': true,
          'challenge.endsAt': true,
          'challenge.isActive': true,
          'challenge.opensAt': true,
        },
      },
      // {
      //   $sort: {
      //     registeredAt: -1,
      //   },
      // },
      {
        $match: {
          'challenge.isActive': true,
          'challenge.opensAt': {
            $lt: date,
          },
        },
      },
      {
        $limit: 1,
      },
    ]);

    const registration: RegistrationWithChallenge = first(registrations);

    if (registration) {
      return RegistrationEntity.create({
        uuid: registration.uuid,
        userId: registration.userId,
        challengeId: registration.challengeId,
        registeredAt: registration.registeredAt,
        isActive: registration.isActive,
        bmi: registration.bmi,
        withProtein: registration.withProtein,
        height: registration.height,
        weight: registration.weight,
        wireTransferReceiptUrl: registration.wireTransferReceiptUrl,
        challenge: null,
      });
    }
  }

  public async findRegistrationsByUserId(userId: string) {
    const registrations = await this.registrationModel.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $lookup: {
          from: 'challenges',
          localField: 'challengeId',
          foreignField: 'uuid',
          as: 'challenge',
        },
      },
      {
        $unwind: '$challenge',
      },
      {
        $project: {
          _id: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          'challenge._id': 0,
          'challenge.playlistId': 0,
          'challenge.createdAt': 0,
          'challenge.updatedAt': 0,
          'challenge.__v': 0,
        },
      },
    ]);

    return registrations.map((registration) =>
      RegistrationEntity.create({
        uuid: registration.uuid,
        userId: registration.userId,
        challengeId: registration.challengeId,
        registeredAt: registration.registeredAt,
        isActive: registration.isActive,
        wireTransferReceiptUrl: registration.wireTransferReceiptUrl,
        bmi: registration.bmi,
        withProtein: registration.withProtein,
        height: registration.height,
        weight: registration.weight,
        challenge: registration.challenge,
      }),
    );
  }

  public async getRegistrationWithChallengeByUserIdAndChallengeId(
    userId: string,
    challengeId: string,
  ) {
    const registrations = await this.registrationModel.aggregate([
      {
        $match: {
          userId,
          challengeId,
        },
      },
      {
        $lookup: {
          from: 'challenges',
          localField: 'challengeId',
          foreignField: 'uuid',
          as: 'challenge',
        },
      },
      {
        $unwind: '$challenge',
      },
      {
        $project: {
          _id: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
          'challenge._id': 0,
          'challenge.createdAt': 0,
          'challenge.updatedAt': 0,
          'challenge.__v': 0,
        },
      },
      {
        $limit: 1,
      },
    ]);

    const registration = first(registrations);

    return RegistrationEntity.create({
      uuid: registration.uuid,
      userId: registration.userId,
      challengeId: registration.challengeId,
      registeredAt: registration.registeredAt,
      isActive: registration.isActive,
      wireTransferReceiptUrl: registration.wireTransferReceiptUrl,
      bmi: registration.bmi,
      withProtein: registration.withProtein,
      height: registration.height,
      weight: registration.weight,
      challenge: registration.challenge,
    });
  }
}
