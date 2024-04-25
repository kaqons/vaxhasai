import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ProjectcomponentDomainFacade } from '@server/modules/projectcomponent/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ProjectcomponentApplicationEvent } from './projectcomponent.application.event'
import { ProjectcomponentCreateDto } from './projectcomponent.dto'

import { ProjectDomainFacade } from '../../project/domain'

@Controller('/v1/projects')
export class ProjectcomponentByProjectController {
  constructor(
    private projectDomainFacade: ProjectDomainFacade,

    private projectcomponentDomainFacade: ProjectcomponentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/project/:projectId/projectcomponents')
  async findManyProjectId(
    @Param('projectId') projectId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.projectDomainFacade.findOneByIdOrFail(projectId)

    const items = await this.projectcomponentDomainFacade.findManyByProject(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/project/:projectId/projectcomponents')
  async createByProjectId(
    @Param('projectId') projectId: string,
    @Body() body: ProjectcomponentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, projectId }

    const item = await this.projectcomponentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ProjectcomponentApplicationEvent.ProjectcomponentCreated.Payload>(
      ProjectcomponentApplicationEvent.ProjectcomponentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
