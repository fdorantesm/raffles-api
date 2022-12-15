import { PostedVideoEventHandler } from './posted-video';

export * from './posted-video/posted-video.event';
export * from './posted-video/posted-video.event.handler';

export const eventHandlers = [PostedVideoEventHandler];
