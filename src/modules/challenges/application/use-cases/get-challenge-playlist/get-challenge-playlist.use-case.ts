import { ConfigService } from '@nestjs/config';
import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { S3Service } from './../../../../shared/services/s3.service';
import { PlaylistVideoDto } from '../../../../videos/infrastructure/http/dtos/playlist-videos.dto';
import { RegistrationsService } from '../../../infrastructure/database/services/registrations.service';
import { VideoService } from '../../../../videos/infrastructure/database/services/video.service';
import { PlaylistVideoService } from '../../../../videos/infrastructure/database/services/playlist-video.service';
import { ChallengesService } from 'src/modules/challenges/infrastructure/database/services/challenges.services';
import { PlaylistsService } from 'src/modules/videos/infrastructure/database/services/playlist.service';
import { UsersService } from 'src/modules/users/infrastructure/database/services/users.service';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';

@Injectable()
export class GetChallengePlaylistUseCase {
  constructor(
    private readonly challengesService: ChallengesService,
    private readonly registrationService: RegistrationsService,
    private readonly playlistsService: PlaylistsService,
    private readonly videoService: VideoService,
    private readonly playlistVideoService: PlaylistVideoService,
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {}

  public async exec(challengeId: string, userId: string): Promise<any> {
    const user = await this.usersService.findById(userId);
    const isAdmin = user.scopes.some((scope) => scope === Scope.ROOT);

    if (!isAdmin) {
      const registration = await this.registrationService.findOne({
        userId,
        challengeId,
      });

      if (!registration && user.scopes) {
        throw new NotFoundException('registrations.user_challenge_not_found');
      }

      if (!registration.isActive) {
        throw new HttpException('registrations.payment_required', 402);
      }
    }

    const challenge = await this.challengesService.findById(challengeId);
    const playlist = await this.playlistsService.findById(challenge.playlistId);

    if (!playlist) {
      Logger.log(
        `Playlist ${playlist.name} has been deleted`,
        GetChallengePlaylistUseCase.name,
      );
      throw new NotFoundException('resource.not_found');
    }

    const playlistVideos = await this.playlistVideoService.findByPlaylistId(
      challenge.playlistId,
    );

    const uuids = playlistVideos.map((video) => video.videoId);
    const videos = await this.videoService.findManyById(uuids);
    const bucket = this.configService.get<string>('storage.repository');

    for (const video of videos) {
      const key = video.url.replace(
        /^[a-zA-Z]{3,5}\:\/{2}[a-zA-Z0-9_.:-]+\//,
        '',
      );
      video.url = await this.s3Service.getSignedUrl(key, bucket);
    }

    return {
      uuid: playlist.uuid,
      name: playlist.name,
      videos: videos.map(
        (video, index) =>
          ({
            uuid: video.uuid,
            title: video.title,
            url: video.url,
            captionUrl: video.captionUrl,
            order: playlistVideos[index].order,
            description: video.description,
          } as unknown as PlaylistVideoDto),
      ),
    };
  }
}
