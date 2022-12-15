import { PlaylistEntity } from './../../../domain/entities/playlist.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlaylistModel } from '../models/playlist.model';

@Injectable()
export class PlaylistRepository {
  constructor(
    @InjectModel(PlaylistModel.name)
    private readonly playlistModel: Model<PlaylistModel>,
  ) {}

  public async create(playlistEntity: PlaylistEntity): Promise<PlaylistEntity> {
    const playlist = await this.playlistModel.create(playlistEntity);
    return new PlaylistEntity(playlist.uuid, playlist.name);
  }

  public async findOne(
    filter: Partial<PlaylistEntity>,
  ): Promise<PlaylistEntity> {
    const playlist = await this.playlistModel.findOne(filter).exec();
    if (playlist) {
      return new PlaylistEntity(playlist.uuid, playlist.name);
    }
  }
}
