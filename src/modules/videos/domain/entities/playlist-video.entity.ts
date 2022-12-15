export class PlaylistVideoEntity {
  constructor(
    public playlistId: string,
    public videoId: string,
    public order?: number,
  ) {}

  static create(
    playlistId: string,
    videoId: string,
    order?: number,
  ): PlaylistVideoEntity {
    return new PlaylistVideoEntity(playlistId, videoId, order);
  }
}
