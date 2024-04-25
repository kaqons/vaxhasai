import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { CodesnippetDomainModule } from '../domain'
import { CodesnippetController } from './codesnippet.controller'

import { ProjectDomainModule } from '../../../modules/project/domain'

import { CodesnippetByProjectController } from './codesnippetByProject.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    CodesnippetDomainModule,

    ProjectDomainModule,
  ],
  controllers: [CodesnippetController, CodesnippetByProjectController],
  providers: [],
})
export class CodesnippetApplicationModule {}
