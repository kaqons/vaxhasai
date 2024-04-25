import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ProjectDomainFacade } from './project.domain.facade'
import { Project } from './project.model'

@Module({
  imports: [TypeOrmModule.forFeature([Project]), DatabaseHelperModule],
  providers: [ProjectDomainFacade, ProjectDomainFacade],
  exports: [ProjectDomainFacade],
})
export class ProjectDomainModule {}
