import * as z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, { message: "Your name is requred!" }),
  email: z.string().email(),
  password: z.string().min(1, { message: "Your password is requred!" }),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Your password is required!" }),
});
