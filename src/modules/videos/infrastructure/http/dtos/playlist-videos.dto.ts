export class PlaylistVideoDto {
  title: string;
  url: string;

  captionUrl: string;
  order: string;
}

export class PlaylistVideosDto {
  public uuid: string;
  public name: string;
  public videos: PlaylistVideoDto[];
}
