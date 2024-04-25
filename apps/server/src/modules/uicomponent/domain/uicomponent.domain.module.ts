import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { UicomponentDomainFacade } from './uicomponent.domain.facade'
import { Uicomponent } from './uicomponent.model'

@Module({
  imports: [TypeOrmModule.forFeature([Uicomponent]), DatabaseHelperModule],
  providers: [UicomponentDomainFacade, UicomponentDomainFacade],
  exports: [UicomponentDomainFacade],
})
export class UicomponentDomainModule {}
