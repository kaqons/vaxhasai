export namespace UicomponentApplicationEvent {
  export namespace UicomponentCreated {
    export const key = 'uicomponent.application.uicomponent.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
