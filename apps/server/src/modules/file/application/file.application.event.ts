export namespace FileApplicationEvent {
  export namespace FileCreated {
    export const key = 'file.application.file.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
