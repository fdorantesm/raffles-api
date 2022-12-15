import { SaveVideoCommandHandler } from './save-video';
import { UploadVideoCommandHandler } from './upload-video';

export * from './upload-video';
export * from './save-video';

export const commandHandlers = [
  UploadVideoCommandHandler,
  SaveVideoCommandHandler,
];
