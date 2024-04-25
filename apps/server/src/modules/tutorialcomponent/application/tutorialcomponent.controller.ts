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
  Tutorialcomponent,
  TutorialcomponentDomainFacade,
} from '@server/modules/tutorialcomponent/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { TutorialcomponentApplicationEvent } from './tutorialcomponent.application.event'
import {
  TutorialcomponentCreateDto,
  TutorialcomponentUpdateDto,
} from './tutorialcomponent.dto'

@Controller('/v1/tutorialcomponents')
export class TutorialcomponentController {
  constructor(
    private eventService: EventService,
    private tutorialcomponentDomainFacade: TutorialcomponentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.tutorialcomponentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: TutorialcomponentCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.tutorialcomponentDomainFacade.create(body)

    await this.eventService.emit<TutorialcomponentApplicationEvent.TutorialcomponentCreated.Payload>(
      TutorialcomponentApplicationEvent.TutorialcomponentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:tutorialcomponentId')
  async findOne(
    @Param('tutorialcomponentId') tutorialcomponentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.tutorialcomponentDomainFacade.findOneByIdOrFail(
      tutorialcomponentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:tutorialcomponentId')
  async update(
    @Param('tutorialcomponentId') tutorialcomponentId: string,
    @Body() body: TutorialcomponentUpdateDto,
  ) {
    const item =
      await this.tutorialcomponentDomainFacade.findOneByIdOrFail(
        tutorialcomponentId,
      )

    const itemUpdated = await this.tutorialcomponentDomainFacade.update(
      item,
      body as Partial<Tutorialcomponent>,
    )
    return itemUpdated
  }

  @Delete('/:tutorialcomponentId')
  async delete(@Param('tutorialcomponentId') tutorialcomponentId: string) {
    const item =
      await this.tutorialcomponentDomainFacade.findOneByIdOrFail(
        tutorialcomponentId,
      )

    await this.tutorialcomponentDomainFacade.delete(item)

    return item
  }
}
