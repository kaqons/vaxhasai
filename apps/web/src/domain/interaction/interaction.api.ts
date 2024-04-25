import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Interaction } from './interaction.model'

export class InteractionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Interaction>,
  ): Promise<Interaction[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/interactions${buildOptions}`)
  }

  static findOne(
    interactionId: string,
    queryOptions?: ApiHelper.QueryOptions<Interaction>,
  ): Promise<Interaction> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/interactions/${interactionId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Interaction>): Promise<Interaction> {
    return HttpService.api.post(`/v1/interactions`, values)
  }

  static updateOne(
    interactionId: string,
    values: Partial<Interaction>,
  ): Promise<Interaction> {
    return HttpService.api.patch(`/v1/interactions/${interactionId}`, values)
  }

  static deleteOne(interactionId: string): Promise<void> {
    return HttpService.api.delete(`/v1/interactions/${interactionId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Interaction>,
  ): Promise<Interaction[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/interactions${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Interaction>,
  ): Promise<Interaction> {
    return HttpService.api.post(`/v1/users/user/${userId}/interactions`, values)
  }
}
