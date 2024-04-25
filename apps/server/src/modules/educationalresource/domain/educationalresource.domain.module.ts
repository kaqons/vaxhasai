import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { EducationalresourceDomainFacade } from './educationalresource.domain.facade'
import { Educationalresource } from './educationalresource.model'

@Module({
  imports: [
    TypeOrmModule.forFeature([Educationalresource]),
    DatabaseHelperModule,
  ],
  providers: [EducationalresourceDomainFacade, EducationalresourceDomainFacade],
  exports: [EducationalresourceDomainFacade],
})
export class EducationalresourceDomainModule {}
