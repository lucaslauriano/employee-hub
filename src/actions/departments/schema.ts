import { z } from 'zod';

export const departmentSchema = z.object({
  name: z.string().min(1, 'Department name is required'),
  managerId: z.string().nullable(),
});

export type DepartmentFormData = z.infer<typeof departmentSchema>;

export type ValidationErrors = {
  [K in keyof z.infer<typeof departmentSchema>]?: string[];
};

export type ActionResponse = {
  success?: boolean;
  error?: string | ValidationErrors;
};
