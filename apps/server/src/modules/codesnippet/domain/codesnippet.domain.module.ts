import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { CodesnippetDomainFacade } from './codesnippet.domain.facade'
import { Codesnippet } from './codesnippet.model'

@Module({
  imports: [TypeOrmModule.forFeature([Codesnippet]), DatabaseHelperModule],
  providers: [CodesnippetDomainFacade, CodesnippetDomainFacade],
  exports: [CodesnippetDomainFacade],
})
export class CodesnippetDomainModule {}
