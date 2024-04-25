import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Uicomponent } from './uicomponent.model'

export class UicomponentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Uicomponent>,
  ): Promise<Uicomponent[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/uicomponents${buildOptions}`)
  }

  static findOne(
    uicomponentId: string,
    queryOptions?: ApiHelper.QueryOptions<Uicomponent>,
  ): Promise<Uicomponent> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/uicomponents/${uicomponentId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Uicomponent>): Promise<Uicomponent> {
    return HttpService.api.post(`/v1/uicomponents`, values)
  }

  static updateOne(
    uicomponentId: string,
    values: Partial<Uicomponent>,
  ): Promise<Uicomponent> {
    return HttpService.api.patch(`/v1/uicomponents/${uicomponentId}`, values)
  }

  static deleteOne(uicomponentId: string): Promise<void> {
    return HttpService.api.delete(`/v1/uicomponents/${uicomponentId}`)
  }
}
