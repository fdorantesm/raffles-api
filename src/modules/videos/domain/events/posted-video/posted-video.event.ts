import { File } from '@thp/common/types/general/file.type';

export class PostedVideoEvent {
  constructor(public playlistId: string, public file: File) {}
}
