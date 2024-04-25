import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { InteractionDomainFacade } from './interaction.domain.facade'
import { Interaction } from './interaction.model'

@Module({
  imports: [TypeOrmModule.forFeature([Interaction]), DatabaseHelperModule],
  providers: [InteractionDomainFacade, InteractionDomainFacade],
  exports: [InteractionDomainFacade],
})
export class InteractionDomainModule {}
