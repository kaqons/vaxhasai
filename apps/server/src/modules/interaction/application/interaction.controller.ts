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
  Interaction,
  InteractionDomainFacade,
} from '@server/modules/interaction/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { InteractionApplicationEvent } from './interaction.application.event'
import { InteractionCreateDto, InteractionUpdateDto } from './interaction.dto'

@Controller('/v1/interactions')
export class InteractionController {
  constructor(
    private eventService: EventService,
    private interactionDomainFacade: InteractionDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.interactionDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: InteractionCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.interactionDomainFacade.create(body)

    await this.eventService.emit<InteractionApplicationEvent.InteractionCreated.Payload>(
      InteractionApplicationEvent.InteractionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:interactionId')
  async findOne(
    @Param('interactionId') interactionId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.interactionDomainFacade.findOneByIdOrFail(
      interactionId,
      queryOptions,
    )

    return item
  }

  @Patch('/:interactionId')
  async update(
    @Param('interactionId') interactionId: string,
    @Body() body: InteractionUpdateDto,
  ) {
    const item =
      await this.interactionDomainFacade.findOneByIdOrFail(interactionId)

    const itemUpdated = await this.interactionDomainFacade.update(
      item,
      body as Partial<Interaction>,
    )
    return itemUpdated
  }

  @Delete('/:interactionId')
  async delete(@Param('interactionId') interactionId: string) {
    const item =
      await this.interactionDomainFacade.findOneByIdOrFail(interactionId)

    await this.interactionDomainFacade.delete(item)

    return item
  }
}
