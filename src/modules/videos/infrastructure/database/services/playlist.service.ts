import { Injectable } from '@nestjs/common';
import { PlaylistEntity } from 'src/modules/videos/domain/entities/playlist.entity';
import { PlaylistRepository } from '../repositories/playlist.repository';

@Injectable()
export class PlaylistsService {
  constructor(private readonly playlistRepository: PlaylistRepository) {}

  public async create(playlistEntity: PlaylistEntity): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.create(playlistEntity);
    return new PlaylistEntity(playlist.uuid, playlist.name);
  }

  public async findOne(
    filter: Partial<PlaylistEntity>,
  ): Promise<PlaylistEntity> {
    return this.playlistRepository.findOne(filter);
  }

  public async findById(uuid: string): Promise<PlaylistEntity> {
    const playlist = await this.playlistRepository.findOne({ uuid });
    return new PlaylistEntity(playlist.uuid, playlist.name);
  }
}
