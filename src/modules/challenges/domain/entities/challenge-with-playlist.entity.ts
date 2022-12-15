import { PlaylistEntity } from './../../../videos/domain/entities/playlist.entity';

export class ChallengeWithPlaylistEntity {
  constructor(
    public uuid: string,
    public name: string,
    public playlistId: string,
    public playlist: PlaylistEntity,
    public fileUrl: string,
    public startsAt: Date,
    public endsAt: Date,
  ) {}
}
