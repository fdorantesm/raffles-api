export class VideoEntity {
  constructor(
    public uuid: string,
    public title: string,
    public url: string,
    public captionUrl?: string,

    public description?: string,
  ) {}

  static create({
    uuid,
    title,
    url,
    captionUrl,
    description,
  }: {
    uuid: string;
    title: string;
    url: string;
    captionUrl?: string;
    description?: string;
  }) {
    return new VideoEntity(uuid, title, url, captionUrl, description);
  }
}
