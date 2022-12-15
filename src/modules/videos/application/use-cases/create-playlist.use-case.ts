import { Inject, Injectable } from '@nestjs/common';

import {
  IdGeneratorService,
  ID_GENERATOR_SERVICE,
} from './../../../../../libs/id-generator/src/id-generator.interface';
import { PlaylistEntity } from '../../domain/entities/playlist.entity';
import { PlaylistsService } from './../../infrastructure/database/services/playlist.service';

@Injectable()
export class CreatePlaylistUseCase {
  constructor(
    private readonly playlistService: PlaylistsService,

    @Inject(ID_GENERATOR_SERVICE)
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  public async create(name: string): Promise<PlaylistEntity> {
    const uuid = this.idGeneratorService.exec();
    const playlist = await this.playlistService.create({
      uuid,
      name,
    });
    return new PlaylistEntity(playlist.uuid, playlist.name);
  }

  public async findOne(
    filter: Partial<PlaylistEntity>,
  ): Promise<PlaylistEntity> {
    const playlist = await this.playlistService.findOne(filter);
    return new PlaylistEntity(playlist.uuid, playlist.name);
  }
}
