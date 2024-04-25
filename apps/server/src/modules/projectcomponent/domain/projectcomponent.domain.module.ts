import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ProjectcomponentDomainFacade } from './projectcomponent.domain.facade'
import { Projectcomponent } from './projectcomponent.model'

@Module({
  imports: [TypeOrmModule.forFeature([Projectcomponent]), DatabaseHelperModule],
  providers: [ProjectcomponentDomainFacade, ProjectcomponentDomainFacade],
  exports: [ProjectcomponentDomainFacade],
})
export class ProjectcomponentDomainModule {}
