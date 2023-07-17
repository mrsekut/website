import { Effect } from "effect"
import { resource } from "./resource"

// $ExpectType Effect<never, Error, void>
const program = resource.pipe(
  Effect.flatMap((res) =>
    Effect.sync(() => console.log(`content is ${res.contents}`))
  ),
  Effect.scoped
)
