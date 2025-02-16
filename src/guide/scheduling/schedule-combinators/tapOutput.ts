import { Effect, Schedule } from "effect"
import * as Delay from "./Delay"

const schedule = Schedule.tapOutput(Schedule.recurs(2), (n) =>
  Effect.sync(() => console.log(`repeating ${n}`))
)

Effect.runPromise(Effect.repeat(Delay.log, schedule))
/*
Output:
delay: 2
repeating 0
delay: 8
repeating 1
delay: 5
repeating 2
 */
