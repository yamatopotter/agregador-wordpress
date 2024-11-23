
import { z } from 'zod'

import { env } from '@/env'
import {setup} from "axios-cache-adapter";

const errorMessageSchema = z.object({
    status: z.number(),
    errorMessage: z.string(),
    path: z.string(),
    timestamp: z.string(),
})

export type ErrorMessage = z.infer<typeof errorMessageSchema>

export const api = setup({
    baseURL: env.BASE_URL,
    timeout: 3000,
    cache: {
      maxAge: 15*60*1000
    },
    headers: {
        'Content-Type': 'application/json',
    },
})