import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    about: z.string(),
    // attachments: z.array(z.string().url()),
    files: z
        .array(
            z
                .instanceof(File)
        )
        .min(1, 'At least 1 file is required')
        .refine(
            (files) => files.every((file) => file.size < 1024 * 1024 * 4),
            'File size must be less than 4Mb',
        ),
});