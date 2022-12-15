export class UploadVideoCommand {
  constructor(
    public readonly playlistId: string,
    public readonly fieldname: string,
    public readonly originalname: string,
    public readonly enconding: string,
    public readonly mimetype: string,
    public readonly buffer: Buffer,
    public readonly size: number,
  ) {}
}
