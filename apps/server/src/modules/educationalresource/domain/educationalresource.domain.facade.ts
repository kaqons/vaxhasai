import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Educationalresource } from './educationalresource.model'

@Injectable()
export class EducationalresourceDomainFacade {
  constructor(
    @InjectRepository(Educationalresource)
    private repository: Repository<Educationalresource>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(
    values: Partial<Educationalresource>,
  ): Promise<Educationalresource> {
    return this.repository.save(values)
  }

  async update(
    item: Educationalresource,
    values: Partial<Educationalresource>,
  ): Promise<Educationalresource> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Educationalresource): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Educationalresource> = {},
  ): Promise<Educationalresource[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Educationalresource> = {},
  ): Promise<Educationalresource> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }
}
