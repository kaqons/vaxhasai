import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Tutorialcomponent } from './tutorialcomponent.model'

export class TutorialcomponentApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Tutorialcomponent>,
  ): Promise<Tutorialcomponent[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/tutorialcomponents${buildOptions}`)
  }

  static findOne(
    tutorialcomponentId: string,
    queryOptions?: ApiHelper.QueryOptions<Tutorialcomponent>,
  ): Promise<Tutorialcomponent> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/tutorialcomponents/${tutorialcomponentId}${buildOptions}`,
    )
  }

  static createOne(
    values: Partial<Tutorialcomponent>,
  ): Promise<Tutorialcomponent> {
    return HttpService.api.post(`/v1/tutorialcomponents`, values)
  }

  static updateOne(
    tutorialcomponentId: string,
    values: Partial<Tutorialcomponent>,
  ): Promise<Tutorialcomponent> {
    return HttpService.api.patch(
      `/v1/tutorialcomponents/${tutorialcomponentId}`,
      values,
    )
  }

  static deleteOne(tutorialcomponentId: string): Promise<void> {
    return HttpService.api.delete(
      `/v1/tutorialcomponents/${tutorialcomponentId}`,
    )
  }

  static findManyByTutorialId(
    tutorialId: string,
    queryOptions?: ApiHelper.QueryOptions<Tutorialcomponent>,
  ): Promise<Tutorialcomponent[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/tutorials/tutorial/${tutorialId}/tutorialcomponents${buildOptions}`,
    )
  }

  static createOneByTutorialId(
    tutorialId: string,
    values: Partial<Tutorialcomponent>,
  ): Promise<Tutorialcomponent> {
    return HttpService.api.post(
      `/v1/tutorials/tutorial/${tutorialId}/tutorialcomponents`,
      values,
    )
  }

  static findManyByComponentId(
    componentId: string,
    queryOptions?: ApiHelper.QueryOptions<Tutorialcomponent>,
  ): Promise<Tutorialcomponent[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/uicomponents/component/${componentId}/tutorialcomponents${buildOptions}`,
    )
  }

  static createOneByComponentId(
    componentId: string,
    values: Partial<Tutorialcomponent>,
  ): Promise<Tutorialcomponent> {
    return HttpService.api.post(
      `/v1/uicomponents/component/${componentId}/tutorialcomponents`,
      values,
    )
  }
}
