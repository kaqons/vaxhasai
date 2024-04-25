export namespace ProjectcomponentApplicationEvent {
  export namespace ProjectcomponentCreated {
    export const key = 'projectcomponent.application.projectcomponent.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
