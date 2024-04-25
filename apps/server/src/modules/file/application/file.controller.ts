import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import { File, FileDomainFacade } from '@server/modules/file/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { FileApplicationEvent } from './file.application.event'
import { FileCreateDto, FileUpdateDto } from './file.dto'

@Controller('/v1/files')
export class FileController {
  constructor(
    private eventService: EventService,
    private fileDomainFacade: FileDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.fileDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: FileCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.fileDomainFacade.create(body)

    await this.eventService.emit<FileApplicationEvent.FileCreated.Payload>(
      FileApplicationEvent.FileCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:fileId')
  async findOne(@Param('fileId') fileId: string, @Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.fileDomainFacade.findOneByIdOrFail(
      fileId,
      queryOptions,
    )

    return item
  }

  @Patch('/:fileId')
  async update(@Param('fileId') fileId: string, @Body() body: FileUpdateDto) {
    const item = await this.fileDomainFacade.findOneByIdOrFail(fileId)

    const itemUpdated = await this.fileDomainFacade.update(
      item,
      body as Partial<File>,
    )
    return itemUpdated
  }

  @Delete('/:fileId')
  async delete(@Param('fileId') fileId: string) {
    const item = await this.fileDomainFacade.findOneByIdOrFail(fileId)

    await this.fileDomainFacade.delete(item)

    return item
  }
}
