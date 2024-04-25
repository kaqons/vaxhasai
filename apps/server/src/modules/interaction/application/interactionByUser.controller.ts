import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { InteractionDomainFacade } from '@server/modules/interaction/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { InteractionApplicationEvent } from './interaction.application.event'
import { InteractionCreateDto } from './interaction.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class InteractionByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private interactionDomainFacade: InteractionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/interactions')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.interactionDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/interactions')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: InteractionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.interactionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<InteractionApplicationEvent.InteractionCreated.Payload>(
      InteractionApplicationEvent.InteractionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
