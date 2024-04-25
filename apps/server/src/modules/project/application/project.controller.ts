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
import { Project, ProjectDomainFacade } from '@server/modules/project/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ProjectApplicationEvent } from './project.application.event'
import { ProjectCreateDto, ProjectUpdateDto } from './project.dto'

@Controller('/v1/projects')
export class ProjectController {
  constructor(
    private eventService: EventService,
    private projectDomainFacade: ProjectDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.projectDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ProjectCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.projectDomainFacade.create(body)

    await this.eventService.emit<ProjectApplicationEvent.ProjectCreated.Payload>(
      ProjectApplicationEvent.ProjectCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:projectId')
  async findOne(
    @Param('projectId') projectId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.projectDomainFacade.findOneByIdOrFail(
      projectId,
      queryOptions,
    )

    return item
  }

  @Patch('/:projectId')
  async update(
    @Param('projectId') projectId: string,
    @Body() body: ProjectUpdateDto,
  ) {
    const item = await this.projectDomainFacade.findOneByIdOrFail(projectId)

    const itemUpdated = await this.projectDomainFacade.update(
      item,
      body as Partial<Project>,
    )
    return itemUpdated
  }

  @Delete('/:projectId')
  async delete(@Param('projectId') projectId: string) {
    const item = await this.projectDomainFacade.findOneByIdOrFail(projectId)

    await this.projectDomainFacade.delete(item)

    return item
  }
}
