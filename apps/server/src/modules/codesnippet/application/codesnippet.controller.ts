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
  Codesnippet,
  CodesnippetDomainFacade,
} from '@server/modules/codesnippet/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { CodesnippetApplicationEvent } from './codesnippet.application.event'
import { CodesnippetCreateDto, CodesnippetUpdateDto } from './codesnippet.dto'

@Controller('/v1/codesnippets')
export class CodesnippetController {
  constructor(
    private eventService: EventService,
    private codesnippetDomainFacade: CodesnippetDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.codesnippetDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: CodesnippetCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.codesnippetDomainFacade.create(body)

    await this.eventService.emit<CodesnippetApplicationEvent.CodesnippetCreated.Payload>(
      CodesnippetApplicationEvent.CodesnippetCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:codesnippetId')
  async findOne(
    @Param('codesnippetId') codesnippetId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.codesnippetDomainFacade.findOneByIdOrFail(
      codesnippetId,
      queryOptions,
    )

    return item
  }

  @Patch('/:codesnippetId')
  async update(
    @Param('codesnippetId') codesnippetId: string,
    @Body() body: CodesnippetUpdateDto,
  ) {
    const item =
      await this.codesnippetDomainFacade.findOneByIdOrFail(codesnippetId)

    const itemUpdated = await this.codesnippetDomainFacade.update(
      item,
      body as Partial<Codesnippet>,
    )
    return itemUpdated
  }

  @Delete('/:codesnippetId')
  async delete(@Param('codesnippetId') codesnippetId: string) {
    const item =
      await this.codesnippetDomainFacade.findOneByIdOrFail(codesnippetId)

    await this.codesnippetDomainFacade.delete(item)

    return item
  }
}
