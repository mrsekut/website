import { Effect, Context, Layer, RequestResolver } from "effect"
import * as Model from "./Model"
import * as RequestModel from "./RequestModel"
import * as ResolversWithContext from "./ResolversWithContext"

export interface TodosService {
  getTodos: Effect.Effect<never, Model.GetTodosError, Array<Model.Todo>>
}

export const TodosService = Context.Tag<TodosService>(
  Symbol.for("@app/services/TodosService")
)

export const TodosServiceLive = Layer.effect(
  TodosService,
  Effect.gen(function* ($) {
    const http = yield* $(ResolversWithContext.HttpService)
    const resolver = RequestResolver.fromFunctionEffect(
      (request: RequestModel.GetTodos) =>
        Effect.tryPromise({
          try: () =>
            http
              .fetch("https://api.example.demo/todos")
              .then((_) => _.json()) as Promise<Array<Model.Todo>>,
          catch: () => new Model.GetTodosError(),
        })
    )
    return {
      getTodos: Effect.request(RequestModel.GetTodos({}), resolver),
    }
  })
)

export const getTodos: Effect.Effect<
  TodosService,
  Model.GetTodosError,
  Array<Model.Todo>
> = TodosService.pipe(Effect.flatMap((_) => _.getTodos))
