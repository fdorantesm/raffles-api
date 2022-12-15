import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from './../../../../auth/application/guards/jwt.guard';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  HttpStatus,
  Headers,
  Req,
  Res,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { File } from '@thp/common/types/general/file.type';
import { Scopes } from 'src/modules/auth/application/decorators/scopes.decorator';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { ScopeGuard } from '../../../../auth/application/guards/scope.guard';
import { CreateUploadIdUseCase } from 'src/modules/videos/application/use-cases/create-upload-id.use-case';
import { UploadPartVideoUseCase } from 'src/modules/videos/application/use-cases/upload-part-video.use-case';
import { UploadVideoPartDto } from '../dtos/upload-video-part.dto';
import { UploadVideoPartResponseDto } from '../dtos/upload-video-part.response-dto';
import { CompleteMultiPartFileUseCase } from 'src/modules/videos/application/use-cases/complete-multipart-file.use-case';
import { CompleteMultipartUploadDto } from '../dtos/complete-multipart-upload.dto';
import { CreateUploadIdDto } from '../dtos/create-upload-id-dto';
import { StreamVideoUseCase } from 'src/modules/videos/application/use-cases/stream-video.use-case';
import { Response, Request } from 'express';
import { DeleteVideoUseCase } from 'src/modules/videos/application/use-cases/delete-video.use-case';
import { UpdateVideoUseCase } from 'src/modules/videos/application/use-cases/update-video.use-case';
import { UpdateVideoDto } from '../dtos/update-video.dto';

@ApiTags('Videos')
@Controller({ version: '1', path: 'videos' })
export class VideosController {
  constructor(
    private readonly createUploadIdUseCase: CreateUploadIdUseCase,
    private readonly uploadPartVideoUseCase: UploadPartVideoUseCase,
    private readonly completeMultiPartFileUseCase: CompleteMultiPartFileUseCase,
    private readonly streamVideoUseCase: StreamVideoUseCase,
    private readonly deleteVideoUseCase: DeleteVideoUseCase,
    private readonly updateVideoUseCase: UpdateVideoUseCase,
  ) {}

  @HttpCode(201)
  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Put('/')
  public createUploadId(
    @Body() body: CreateUploadIdDto,
  ): Promise<{ uploadId: string; key: string }> {
    return this.createUploadIdUseCase.exec(body.path, body.contentType);
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  public uploadVideo(
    @Body() part: UploadVideoPartDto,
    @UploadedFile() file: File,
  ): Promise<UploadVideoPartResponseDto> {
    return this.uploadPartVideoUseCase.exec(
      part.playlistId,
      file,
      part.uploadId,
      parseInt(part.partNumber, 10),
      part.fileId,
    );
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Patch('/')
  @UseInterceptors(FileInterceptor('file'))
  public completeUpload(@Body() body: CompleteMultipartUploadDto) {
    return this.completeMultiPartFileUseCase.exec(
      body.uploadId,
      body.key,
      body.parts,
    );
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Delete('/:uuid')
  public async deleteVideo(@Param('uuid') uuid: string) {
    return await this.deleteVideoUseCase.exec(uuid);
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Patch('/:uuid')
  public async updateVideo(
    @Param('uuid') uuid: string,
    @Body() data: UpdateVideoDto,
  ) {
    return await this.updateVideoUseCase.exec(uuid, data);
  }

  // @UseGuards(JwtGuard, ScopeGuard)
  // @Scopes(Scope.ROOT, Scope.WORKOUTS)
  @HttpCode(HttpStatus.PARTIAL_CONTENT)
  @Get('/*')
  public async stream(
    @Param('0') path: string,
    @Headers('Range') range: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const data = await this.streamVideoUseCase.exec(path, range);

    const body = data.file;

    Object.keys(data.headers).map((key) => {
      res.setHeader(key, data.headers[key]);
    });

    data.file.pipe(res);
    return;
  }
}
