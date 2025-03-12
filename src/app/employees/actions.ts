'use server';

import { prisma } from '@/lib/prisma';
import { IEmployeeForm } from '@/types/employees';
import { revalidatePath } from 'next/cache';
import {
  employeeSchema,
  type ActionResponse,
  type ValidationErrors,
} from './schema';
import { z } from 'zod';

export async function createEmployee(
  data: IEmployeeForm
): Promise<ActionResponse> {
  try {
    const validatedData = await employeeSchema.parseAsync(data);

    const emailExists = await prisma.employee.findUnique({
      where: { email: data.email },
      select: { id: true },
    });

    const documentExists = await prisma.employee.findUnique({
      where: { document: data.document },
      select: { id: true },
    });

    if (emailExists || documentExists) {
      return {
        error: {
          ...(emailExists && { email: ['Email already exists'] }),
          ...(documentExists && { document: ['Document already exists'] }),
        },
      };
    }

    await prisma.employee.create({
      data: validatedData,
    });

    revalidatePath('/employees');
    return { success: true };
  } catch (error) {
    console.error('Error creating employee:', error);
    if (error instanceof z.ZodError) {
      const errors: ValidationErrors = {};
      error.errors.forEach((err) => {
        if (err.path) {
          const field = err.path[0] as keyof ValidationErrors;
          if (!errors[field]) {
            errors[field] = [];
          }
          errors[field]?.push(err.message);
        }
      });
      return { error: errors };
    }
    return { error: 'Failed to create employee' };
  }
}
