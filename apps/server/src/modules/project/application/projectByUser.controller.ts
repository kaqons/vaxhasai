import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ProjectDomainFacade } from '@server/modules/project/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ProjectApplicationEvent } from './project.application.event'
import { ProjectCreateDto } from './project.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ProjectByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private projectDomainFacade: ProjectDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/projects')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.projectDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/projects')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: ProjectCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.projectDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ProjectApplicationEvent.ProjectCreated.Payload>(
      ProjectApplicationEvent.ProjectCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
