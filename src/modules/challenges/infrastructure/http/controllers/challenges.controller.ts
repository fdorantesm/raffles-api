import { FindNextChallengeUseCase } from './../../../application/use-cases/find-next-challenge/find-next-challenge.use-case';
import { FindCurrentChallengeUseCase } from './../../../application/use-cases/find-current-challenge/find-current-challenge.use-case';
import { JwtGuard } from './../../../../auth/application/guards/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { UserRequest } from './../../../../../../libs/common/src/types/http/user-request.type';
import { GetChallengePlaylistUseCase } from '../../../application/use-cases/get-challenge-playlist/get-challenge-playlist.use-case';
import { GetChallengeUseCase } from '../../../application/use-cases/get-challenge/get-challenge.use-case';
import { DeleteChallengeUseCase } from '../../../application/use-cases/delete-challenge/delete-challenge.use-case';
import { UpdateChallengeUseCase } from '../../../application/use-cases/update-challenge/update-challenge.use-case';
import { ChallengeEntity } from './../../../domain/entities/challenge.entity';
import { CreateChallengeUseCase } from '../../../application/use-cases/create-challenge/create-challenge.use-case';
import { ListChallengesUseCase } from 'src/modules/challenges/application/use-cases/list-challenges/list-challenges.use-case';
import { Scopes } from 'src/modules/auth/application/decorators/scopes.decorator';
import { ScopeGuard } from 'src/modules/auth/application/guards/scope.guard';
import { Scope } from 'src/modules/users/domain/enums/scope.enum';
import { CreateChallengeDto } from '../dtos/create-challenge.dto';
import { UpdateChallengeDto } from '../dtos/update-challenge.dto';
import { File } from '@thp/common/types/general/file.type';
import { UploadChallengeFileUseCase } from 'src/modules/challenges/application/use-cases/upload-challenge-file/upload-challenge-file.use-case';
import { UploadChallengeFileDto } from '../dtos/upload-challenge-file.dto';
import { ListRegistrationsByChallengeIdUseCase } from 'src/modules/challenges/application/use-cases/list-registrations-by-challenge-id/list-registrations-by-challenge-id.use-case';
import { ListChallengeFilesUseCase } from 'src/modules/challenges/application/use-cases/list-challenge-files/list-challenge-files.use-case';
import { ChallengeFileEntity } from 'src/modules/challenges/domain/entities/challenge-file.entity';
import { UpdateChallengeFileUseCase } from 'src/modules/challenges/application/use-cases/update-challenge-file/update-challenge-file.use-case';

@ApiTags('Challenges')
@Controller({
  version: '1',
  path: 'challenges',
})
export class ChallengesController {
  constructor(
    private readonly createChallengeUseCase: CreateChallengeUseCase,
    private readonly getChallengeUseCase: GetChallengeUseCase,
    private readonly deleteChallengeUseCase: DeleteChallengeUseCase,
    private readonly updateChallengeUseCase: UpdateChallengeUseCase,
    private readonly listChallengesUseCase: ListChallengesUseCase,
    private readonly getChallengePlaylistUseCase: GetChallengePlaylistUseCase,
    private readonly findCurrentChallengeUseCase: FindCurrentChallengeUseCase,
    private readonly uploadChallengeFileUseCase: UploadChallengeFileUseCase,
    private readonly listRegistrationsUseCase: ListRegistrationsByChallengeIdUseCase,
    private readonly listChallengeFilesUseCase: ListChallengeFilesUseCase,
    private readonly updateChallengeFileUseCase: UpdateChallengeFileUseCase,
    private readonly findNextChallengeUseCase: FindNextChallengeUseCase,
  ) {}

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  public async create(
    @Body() challenge: CreateChallengeDto,
  ): Promise<ChallengeEntity> {
    return await this.createChallengeUseCase.exec(challenge);
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Get('/')
  public async list(): Promise<ChallengeEntity[]> {
    return await this.listChallengesUseCase.exec();
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT, Scope.WORKOUTS)
  @Get('/next')
  public async findNextChallenge(
    @Param('uuid') uuid: string,
  ): Promise<ChallengeEntity> {
    return await this.findNextChallengeUseCase.exec();
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT, Scope.WORKOUTS)
  @Get('/:uuid')
  public async get(@Param('uuid') uuid: string): Promise<ChallengeEntity> {
    return await this.getChallengeUseCase.exec(uuid);
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Patch('/:uuid')
  public async update(
    @Param('uuid') uuid: string,
    @Body() data: UpdateChallengeDto,
  ): Promise<ChallengeEntity> {
    return await this.updateChallengeUseCase.exec(uuid, data);
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Delete('/:uuid')
  public async delete(@Param('uuid') uuid: string): Promise<void> {
    return await this.deleteChallengeUseCase.exec(uuid);
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT, Scope.WORKOUTS)
  @Get('/:uuid/playlist')
  public async getPlaylist(
    @Param('uuid') uuid: string,
    @Request() request: UserRequest,
  ): Promise<any> {
    return await this.getChallengePlaylistUseCase.exec(uuid, request.user.id);
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Get('/current')
  public async getCurrentChallenge(): Promise<any> {
    return this.findCurrentChallengeUseCase.exec(new Date());
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Post('/:uuid/files')
  public async uploadChallengeFiles(
    @UploadedFile() file: File,
    @Param('uuid') uuid: string,
    @Body() body: UploadChallengeFileDto,
  ): Promise<any> {
    return this.uploadChallengeFileUseCase.exec(
      { ...body, challengeId: uuid },
      file,
    );
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Patch('/:uuid/files/:fileId')
  public async updateChallengeFile(
    @UploadedFile() file: File,
    @Param('uuid') uuid: string,
    @Param('fileId') fileId: string,
  ): Promise<any> {
    return this.updateChallengeFileUseCase.exec(uuid, fileId, file);
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Get('/:uuid/files')
  public listChallengeFiles(
    @Param('uuid') uuid: string,
  ): Promise<ChallengeFileEntity[]> {
    return this.listChallengeFilesUseCase.exec(uuid);
  }

  @UseGuards(JwtGuard, ScopeGuard)
  @Scopes(Scope.ROOT)
  @Get('/:uuid/registrations')
  public async getChallengeRegistrations(@Param('uuid') uuid: string) {
    return this.listRegistrationsUseCase.exec(uuid);
  }
}
