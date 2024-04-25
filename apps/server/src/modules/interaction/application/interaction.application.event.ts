export namespace InteractionApplicationEvent {
  export namespace InteractionCreated {
    export const key = 'interaction.application.interaction.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
