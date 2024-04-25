import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { InteractionDomainModule } from '../domain'
import { InteractionController } from './interaction.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { InteractionByUserController } from './interactionByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    InteractionDomainModule,

    UserDomainModule,
  ],
  controllers: [InteractionController, InteractionByUserController],
  providers: [],
})
export class InteractionApplicationModule {}
