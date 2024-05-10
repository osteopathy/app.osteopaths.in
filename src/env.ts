import { createEnv } from "@t3-oss/env-nextjs";
import { vercel } from "@t3-oss/env-nextjs/presets";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    GOOGLE_CLIENT_ID: z.string().min(1).trim(),
    GOOGLE_CLIENT_SECRET: z.string().min(1).trim(),
    GOOGLE_REDIRECT_URI: z.string().min(1).trim(),
    GOOGLE_SCOPES: z.string().min(1).transform((s) => s.split(",")),
    GOOGLE_CALENDAR_SCOPES: z.string().min(1).transform((s) => s.split(",")),
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  runtimeEnv: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    GOOGLE_SCOPES: process.env.GOOGLE_SCOPES,
    GOOGLE_CALENDAR_SCOPES: process.env.GOOGLE_CALENDAR_SCOPES,
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  // experimental__runtimeEnv: {
  //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  // }
  extends: [vercel()],
});