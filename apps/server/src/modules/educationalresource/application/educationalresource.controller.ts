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
  Educationalresource,
  EducationalresourceDomainFacade,
} from '@server/modules/educationalresource/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { EducationalresourceApplicationEvent } from './educationalresource.application.event'
import {
  EducationalresourceCreateDto,
  EducationalresourceUpdateDto,
} from './educationalresource.dto'

@Controller('/v1/educationalresources')
export class EducationalresourceController {
  constructor(
    private eventService: EventService,
    private educationalresourceDomainFacade: EducationalresourceDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items =
      await this.educationalresourceDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(
    @Body() body: EducationalresourceCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.educationalresourceDomainFacade.create(body)

    await this.eventService.emit<EducationalresourceApplicationEvent.EducationalresourceCreated.Payload>(
      EducationalresourceApplicationEvent.EducationalresourceCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:educationalresourceId')
  async findOne(
    @Param('educationalresourceId') educationalresourceId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.educationalresourceDomainFacade.findOneByIdOrFail(
      educationalresourceId,
      queryOptions,
    )

    return item
  }

  @Patch('/:educationalresourceId')
  async update(
    @Param('educationalresourceId') educationalresourceId: string,
    @Body() body: EducationalresourceUpdateDto,
  ) {
    const item = await this.educationalresourceDomainFacade.findOneByIdOrFail(
      educationalresourceId,
    )

    const itemUpdated = await this.educationalresourceDomainFacade.update(
      item,
      body as Partial<Educationalresource>,
    )
    return itemUpdated
  }

  @Delete('/:educationalresourceId')
  async delete(@Param('educationalresourceId') educationalresourceId: string) {
    const item = await this.educationalresourceDomainFacade.findOneByIdOrFail(
      educationalresourceId,
    )

    await this.educationalresourceDomainFacade.delete(item)

    return item
  }
}
