import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { FileDomainFacade } from '@server/modules/file/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { FileApplicationEvent } from './file.application.event'
import { FileCreateDto } from './file.dto'

import { ProjectDomainFacade } from '../../project/domain'

@Controller('/v1/projects')
export class FileByProjectController {
  constructor(
    private projectDomainFacade: ProjectDomainFacade,

    private fileDomainFacade: FileDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/project/:projectId/files')
  async findManyProjectId(
    @Param('projectId') projectId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.projectDomainFacade.findOneByIdOrFail(projectId)

    const items = await this.fileDomainFacade.findManyByProject(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/project/:projectId/files')
  async createByProjectId(
    @Param('projectId') projectId: string,
    @Body() body: FileCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, projectId }

    const item = await this.fileDomainFacade.create(valuesUpdated)

    await this.eventService.emit<FileApplicationEvent.FileCreated.Payload>(
      FileApplicationEvent.FileCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
