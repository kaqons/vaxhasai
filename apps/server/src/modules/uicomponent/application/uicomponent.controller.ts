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
  Uicomponent,
  UicomponentDomainFacade,
} from '@server/modules/uicomponent/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { UicomponentApplicationEvent } from './uicomponent.application.event'
import { UicomponentCreateDto, UicomponentUpdateDto } from './uicomponent.dto'

@Controller('/v1/uicomponents')
export class UicomponentController {
  constructor(
    private eventService: EventService,
    private uicomponentDomainFacade: UicomponentDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.uicomponentDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: UicomponentCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.uicomponentDomainFacade.create(body)

    await this.eventService.emit<UicomponentApplicationEvent.UicomponentCreated.Payload>(
      UicomponentApplicationEvent.UicomponentCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:uicomponentId')
  async findOne(
    @Param('uicomponentId') uicomponentId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.uicomponentDomainFacade.findOneByIdOrFail(
      uicomponentId,
      queryOptions,
    )

    return item
  }

  @Patch('/:uicomponentId')
  async update(
    @Param('uicomponentId') uicomponentId: string,
    @Body() body: UicomponentUpdateDto,
  ) {
    const item =
      await this.uicomponentDomainFacade.findOneByIdOrFail(uicomponentId)

    const itemUpdated = await this.uicomponentDomainFacade.update(
      item,
      body as Partial<Uicomponent>,
    )
    return itemUpdated
  }

  @Delete('/:uicomponentId')
  async delete(@Param('uicomponentId') uicomponentId: string) {
    const item =
      await this.uicomponentDomainFacade.findOneByIdOrFail(uicomponentId)

    await this.uicomponentDomainFacade.delete(item)

    return item
  }
}
