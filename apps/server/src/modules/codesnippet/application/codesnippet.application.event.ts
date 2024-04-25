export namespace CodesnippetApplicationEvent {
  export namespace CodesnippetCreated {
    export const key = 'codesnippet.application.codesnippet.created'

    export type Payload = {
      id: string
      userId: string
    }
  }
}
