import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TutorialcomponentDomainFacade } from '@server/modules/tutorialcomponent/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TutorialcomponentApplicationEvent } from './tutorialcomponent.application.event'
import { TutorialcomponentCreateDto } from './tutorialcomponent.dto'

import { TutorialDomainFacade } from '../../tutorial/domain'

@Controller('/v1/tutorials')
export class TutorialcomponentByTutorialController {
  constructor(
    private tutorialDomainFacade: TutorialDomainFacade,

    private tutorialcomponentDomainFacade: TutorialcomponentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/tutorial/:tutorialId/tutorialcomponents')
  async findManyTutorialId(
    @Param('tutorialId') tutorialId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.tutorialDomainFacade.findOneByIdOrFail(tutorialId)

    const items = await this.tutorialcomponentDomainFacade.findManyByTutorial(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/tutorial/:tutorialId/tutorialcomponents')
  async createByTutorialId(
    @Param('tutorialId') tutorialId: string,
    @Body() body: TutorialcomponentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, tutorialId }

    const item = await this.tutorialcomponentDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TutorialcomponentApplicationEvent.TutorialcomponentCreated.Payload>(
      TutorialcomponentApplicationEvent.TutorialcomponentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}
