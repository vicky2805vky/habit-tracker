import { z } from "zod";

export const formSchema = z.object({
  email: z.string().nonempty("email is required").email(),
  password: z
    .string()
    .nonempty("password is required")
    .min(8, "password must has minimum 8 characters"),
});

export const extendedFormSchema = formSchema.extend({
  userName: z.string().nonempty("username is required"),
});

export type FormFields = z.infer<typeof formSchema>;
export type ExtendedFormFields = z.infer<typeof extendedFormSchema>;
