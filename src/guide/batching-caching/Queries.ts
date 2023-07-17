import { Effect } from "effect"
import * as Model from "./Model"
import * as RequestModel from "./RequestModel"
import * as Resolvers from "./Resolvers"

export const getTodos: Effect.Effect<
  never,
  Model.GetTodosError,
  Array<Model.Todo>
> = Effect.request(RequestModel.GetTodos({}), Resolvers.GetTodosResolver)

export const getUserById = (id: number) =>
  Effect.request(
    RequestModel.GetUserById({ id }),
    Resolvers.GetUserByIdResolver
  )

export const sendEmail = (address: string, text: string) =>
  Effect.request(
    RequestModel.SendEmail({ address, text }),
    Resolvers.SendEmailResolver
  )

export const sendEmailToUser = (id: number, message: string) =>
  getUserById(id).pipe(Effect.flatMap((user) => sendEmail(user.email, message)))

export const notifyOwner = (todo: Model.Todo) =>
  getUserById(todo.ownerId).pipe(
    Effect.flatMap((user) =>
      sendEmailToUser(user.id, `hey ${user.name} you got a todo!`)
    )
  )
