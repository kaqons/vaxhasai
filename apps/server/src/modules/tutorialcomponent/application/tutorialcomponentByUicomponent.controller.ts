import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TutorialcomponentDomainFacade } from '@server/modules/tutorialcomponent/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TutorialcomponentApplicationEvent } from './tutorialcomponent.application.event'
import { TutorialcomponentCreateDto } from './tutorialcomponent.dto'

import { UicomponentDomainFacade } from '../../uicomponent/domain'

@Controller('/v1/uicomponents')
export class TutorialcomponentByUicomponentController {
  constructor(
    private uicomponentDomainFacade: UicomponentDomainFacade,

    private tutorialcomponentDomainFacade: TutorialcomponentDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/component/:componentId/tutorialcomponents')
  async findManyComponentId(
    @Param('componentId') componentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent =
      await this.uicomponentDomainFacade.findOneByIdOrFail(componentId)

    const items = await this.tutorialcomponentDomainFacade.findManyByComponent(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/component/:componentId/tutorialcomponents')
  async createByComponentId(
    @Param('componentId') componentId: string,
    @Body() body: TutorialcomponentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, componentId }

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
