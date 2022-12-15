import { JwtGuard } from './../../../../auth/application/guards/jwt.guard';
import { CookieGuard } from './../../../../auth/application/guards/cookie.guard';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { Scopes } from './../../../../auth/application/decorators/scopes.decorator';
import { ScopeGuard } from './../../../../auth/application/guards/scope.guard';
import { CreatePlaylistUseCase } from './../../../application/use-cases/create-playlist.use-case';
import { CreatePlayListDto } from '../dtos/create-playlist.dto';
import { PlaylistEntity } from './../../../domain/entities/playlist.entity';
import { GetPlaylistUseCase } from '../../../application/use-cases/get-playlist.use-case';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { GetPlaylistVideosUseCase } from 'src/modules/videos/application/use-cases/get-playlist-videos.use-case';

@ApiTags('Playlists')
@Controller({ version: '1', path: '/playlists' })
export class PlaylistController {
  constructor(
    private readonly createPlaylistUseCase: CreatePlaylistUseCase,
    private readonly getPlaylistUseCase: GetPlaylistUseCase,
    private readonly getPlaylistVideosUseCase: GetPlaylistVideosUseCase,
  ) {}

  @Scopes(Scope.ROOT)
  @UseGuards(JwtGuard, ScopeGuard)
  @Post('/')
  public create(@Body() playlist: CreatePlayListDto): Promise<PlaylistEntity> {
    return this.createPlaylistUseCase.create(playlist.name);
  }

  @Scopes(Scope.ROOT)
  @UseGuards(JwtGuard, ScopeGuard)
  @Get('/:uuid')
  public getPlaylist(@Param('uuid') uuid: string): Promise<PlaylistEntity> {
    return this.getPlaylistUseCase.exec(uuid);
  }

  @Scopes(Scope.ROOT, Scope.WORKOUTS)
  @UseGuards(JwtGuard, ScopeGuard)
  @Get('/:uuid/videos')
  public getPlaylistVideos(@Param('uuid') uuid: string): Promise<any> {
    return this.getPlaylistVideosUseCase.exec(uuid);
  }
}
