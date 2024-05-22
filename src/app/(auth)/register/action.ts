'use server'; // action.ts

import { parseWithZod } from '@conform-to/zod';
import { registerSchema } from './schema';

export async function register(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: registerSchema
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  console.log("SUBMISSION", formData.get('email'), formData.get('about'), formData.get('files'));
}