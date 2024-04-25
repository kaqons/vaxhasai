export namespace ProjectApplicationEvent {
  export namespace ProjectCreated {
    export const key = 'project.application.project.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
