import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import {
  VideoModel,
  VideoSchema,
} from './infrastructure/database/models/video.model';
import { VideoService } from './infrastructure/database/services/video.service';
import { VideoRepository } from './infrastructure/database/repositories/video.repository';
import { UploadVideoUseCase } from './application/use-cases/upload-video.use-case';
import { VideosController } from './infrastructure/http/controllers/videos.controller';
import { commandHandlers } from './domain/commands';
import { eventHandlers } from './domain/events';
import {
  PlaylistModel,
  PlaylistSchema,
} from './infrastructure/database/models/playlist.model';
import { PlaylistController } from './infrastructure/http/controllers/playlists.controller';
import { CreatePlaylistUseCase } from './application/use-cases/create-playlist.use-case';
import { PlaylistsService } from './infrastructure/database/services/playlist.service';
import { GetPlaylistUseCase } from './application/use-cases/get-playlist.use-case';
import { PlaylistVideoInstance } from './infrastructure/database/models/playlist-video.model';
import { PlaylistVideoRepository } from './infrastructure/database/repositories/playlist-video.repository';
import { PlaylistVideoService } from './infrastructure/database/services/playlist-video.service';
import { PlaylistRepository } from './infrastructure/database/repositories/playlist.repository';
import { IdGeneratorModule } from './../../../libs/id-generator/src/id-generator.module';
import { GetPlaylistVideosUseCase } from './application/use-cases/get-playlist-videos.use-case';
import { CreateUploadIdUseCase } from './application/use-cases/create-upload-id.use-case';
import { UploadPartVideoUseCase } from './application/use-cases/upload-part-video.use-case';
import { CompleteMultiPartFileUseCase } from './application/use-cases/complete-multipart-file.use-case';
import { StreamVideoUseCase } from './application/use-cases/stream-video.use-case';
import { SharedModule } from '../shared/shared.module';
import { DeleteVideoUseCase } from './application/use-cases/delete-video.use-case';
import { UpdateVideoUseCase } from './application/use-cases/update-video.use-case';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      PlaylistVideoInstance,
      { name: VideoModel.name, schema: VideoSchema },
      {
        name: PlaylistModel.name,
        schema: PlaylistSchema,
      },
    ]),
    IdGeneratorModule,
    SharedModule,
  ],
  providers: [
    ...eventHandlers,
    ...commandHandlers,
    UploadVideoUseCase,
    VideoRepository,
    VideoService,
    CreatePlaylistUseCase,
    PlaylistsService,
    PlaylistRepository,
    GetPlaylistUseCase,
    PlaylistVideoRepository,
    PlaylistVideoService,
    GetPlaylistVideosUseCase,
    CreateUploadIdUseCase,
    UploadPartVideoUseCase,
    CompleteMultiPartFileUseCase,
    StreamVideoUseCase,
    DeleteVideoUseCase,
    UpdateVideoUseCase,
  ],
  controllers: [VideosController, PlaylistController],
  exports: [
    VideoService,
    PlaylistsService,
    PlaylistVideoService,
    DeleteVideoUseCase,
    UpdateVideoUseCase,
  ],
})
export class VideosModule {}
