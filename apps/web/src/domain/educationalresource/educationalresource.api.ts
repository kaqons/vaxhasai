import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Educationalresource } from './educationalresource.model'

export class EducationalresourceApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Educationalresource>,
  ): Promise<Educationalresource[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/educationalresources${buildOptions}`)
  }

  static findOne(
    educationalresourceId: string,
    queryOptions?: ApiHelper.QueryOptions<Educationalresource>,
  ): Promise<Educationalresource> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/educationalresources/${educationalresourceId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<Educationalresource>,
  ): Promise<Educationalresource> {
    return HttpService.api.post(`/v1/educationalresources`, values)
  }

  static updateOne(
    educationalresourceId: string,
    values: Partial<Educationalresource>,
  ): Promise<Educationalresource> {
    return HttpService.api.patch(
      `/v1/educationalresources/${educationalresourceId}`,
      values,
    )
  }

  static deleteOne(educationalresourceId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/educationalresources/${educationalresourceId}`,
    )
  }
}
