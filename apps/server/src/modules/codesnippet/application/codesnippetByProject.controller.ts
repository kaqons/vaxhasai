import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { CodesnippetDomainFacade } from '@server/modules/codesnippet/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { CodesnippetApplicationEvent } from './codesnippet.application.event'
import { CodesnippetCreateDto } from './codesnippet.dto'

import { ProjectDomainFacade } from '../../project/domain'

@Controller('/v1/projects')
export class CodesnippetByProjectController {
  constructor(
    private projectDomainFacade: ProjectDomainFacade,

    private codesnippetDomainFacade: CodesnippetDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/project/:projectId/codesnippets')
  async findManyProjectId(
    @Param('projectId') projectId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.projectDomainFacade.findOneByIdOrFail(projectId)

    const items = await this.codesnippetDomainFacade.findManyByProject(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/project/:projectId/codesnippets')
  async createByProjectId(
    @Param('projectId') projectId: string,
    @Body() body: CodesnippetCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, projectId }

    const item = await this.codesnippetDomainFacade.create(valuesUpdated)

    await this.eventService.emit<CodesnippetApplicationEvent.CodesnippetCreated.Payload>(
      CodesnippetApplicationEvent.CodesnippetCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
