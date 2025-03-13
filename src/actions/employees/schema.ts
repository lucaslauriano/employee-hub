import { z } from 'zod';
import { hasLegalAge } from '@/helpers/hasLegalAge';

export const employeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  document: z.string().min(1, 'Document is required'),
  phone: z.string().min(1, 'Phone is required'),
  birthDate: z.string().superRefine(async (date, ctx) => {
    const isLegal = await hasLegalAge(date);
    if (!isLegal) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Employee must be at least 18 years old',
      });
    }
  }),
  departmentId: z.string().nullable(),
});

export type ValidationErrors = {
  [K in keyof z.infer<typeof employeeSchema>]?: string[];
};

export type ActionResponse = {
  success?: boolean;
  error?: string | ValidationErrors;
};

export type EmployeeFormData = z.infer<typeof employeeSchema>;
