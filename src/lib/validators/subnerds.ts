import { z } from 'zod'

export const SubnerdsValidator = z.object({
  name: z.string().min(3).max(21),
})

export const SubnerdsSubscriptionValidator = z.object({
  subnerdsId: z.string(),
})

export type CreateSubnerdsPayload = z.infer<typeof SubnerdsValidator>
export type SubscribeToSubnerdsPayload = z.infer<
  typeof SubnerdsSubscriptionValidator
>