import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ProjectcomponentDomainFacade } from '@server/modules/projectcomponent/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ProjectcomponentApplicationEvent } from './projectcomponent.application.event'
import { ProjectcomponentCreateDto } from './projectcomponent.dto'

import { UicomponentDomainFacade } from '../../uicomponent/domain'

@Controller('/v1/uicomponents')
export class ProjectcomponentByUicomponentController {
  constructor(
    private uicomponentDomainFacade: UicomponentDomainFacade,

    private projectcomponentDomainFacade: ProjectcomponentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/component/:componentId/projectcomponents')
  async findManyComponentId(
    @Param('componentId') componentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.uicomponentDomainFacade.findOneByIdOrFail(componentId)

    const items = await this.projectcomponentDomainFacade.findManyByComponent(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/component/:componentId/projectcomponents')
  async createByComponentId(
    @Param('componentId') componentId: string,
    @Body() body: ProjectcomponentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, componentId }

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
