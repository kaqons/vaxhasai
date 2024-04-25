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
import {
  Projectcomponent,
  ProjectcomponentDomainFacade,
} from '@server/modules/projectcomponent/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ProjectcomponentApplicationEvent } from './projectcomponent.application.event'
import {
  ProjectcomponentCreateDto,
  ProjectcomponentUpdateDto,
} from './projectcomponent.dto'

@Controller('/v1/projectcomponents')
export class ProjectcomponentController {
  constructor(
    private eventService: EventService,
    private projectcomponentDomainFacade: ProjectcomponentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.projectcomponentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: ProjectcomponentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.projectcomponentDomainFacade.create(body)

    await this.eventService.emit<ProjectcomponentApplicationEvent.ProjectcomponentCreated.Payload>(
      ProjectcomponentApplicationEvent.ProjectcomponentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:projectcomponentId')
  async findOne(
    @Param('projectcomponentId') projectcomponentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.projectcomponentDomainFacade.findOneByIdOrFail(
      projectcomponentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:projectcomponentId')
  async update(
    @Param('projectcomponentId') projectcomponentId: string,
    @Body() body: ProjectcomponentUpdateDto,
  ) {
    const item =
      await this.projectcomponentDomainFacade.findOneByIdOrFail(
        projectcomponentId,
      )

    const itemUpdated = await this.projectcomponentDomainFacade.update(
      item,
      body as Partial<Projectcomponent>,
    )
    return itemUpdated
  }

  @Delete('/:projectcomponentId')
  async delete(@Param('projectcomponentId') projectcomponentId: string) {
    const item =
      await this.projectcomponentDomainFacade.findOneByIdOrFail(
        projectcomponentId,
      )

    await this.projectcomponentDomainFacade.delete(item)

    return item
  }
}
