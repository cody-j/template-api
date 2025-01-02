import { z } from 'zod';

const Counter = z.object({
    id: z.string().uuid(),
    counter: z.number().int(),
});

export type Counter = z.infer<typeof Counter>;

