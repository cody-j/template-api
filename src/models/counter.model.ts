import { z } from 'zod';

const Counter = z.object({
    id: z.string().uuid(),
    counter: z.number().int(),
});

type Counter = z.infer<typeof Counter>;