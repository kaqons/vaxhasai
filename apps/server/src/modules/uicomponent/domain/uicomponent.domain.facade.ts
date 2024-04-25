import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Uicomponent } from './uicomponent.model'

@Injectable()
export class UicomponentDomainFacade {
  constructor(
    @InjectRepository(Uicomponent)
    private repository: Repository<Uicomponent>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Uicomponent>): Promise<Uicomponent> {
    return this.repository.save(values)
  }

  async update(
    item: Uicomponent,
    values: Partial<Uicomponent>,
  ): Promise<Uicomponent> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Uicomponent): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Uicomponent> = {},
  ): Promise<Uicomponent[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Uicomponent> = {},
  ): Promise<Uicomponent> {
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
