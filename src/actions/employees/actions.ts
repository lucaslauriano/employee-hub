'use server';

import { IEmployeeForm } from '@/types/employees';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  employeeSchema,
  type ActionResponse,
  type ValidationErrors,
} from './schema';
import { z } from 'zod';
import {
  createEmployeeRecord,
  findEmployeeByDocument,
  findEmployeeByEmail,
  findEmployeeByDocumentExcludingId,
  findEmployeeByEmailExcludingId,
  updateEmployeeRecord,
} from './services';

export async function createEmployee(
  data: IEmployeeForm
): Promise<ActionResponse> {
  try {
    const validatedData = await employeeSchema.parseAsync(data);

    const emailExists = await findEmployeeByEmail(data.email);
    const documentExists = await findEmployeeByDocument(data.document);

    if (emailExists || documentExists) {
      return {
        error: {
          ...(emailExists && { email: ['Email already exists'] }),
          ...(documentExists && { document: ['Document already exists'] }),
        },
      };
    }

    await createEmployeeRecord(validatedData);
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
  revalidatePath('/dashboard/employees');
  redirect('/dashboard/employees');
}

export async function updateEmployee(
  id: string,
  data: IEmployeeForm
): Promise<ActionResponse> {
  try {
    const validatedData = await employeeSchema.parseAsync(data);

    const emailExists = await findEmployeeByEmailExcludingId(data.email, id);
    const documentExists = await findEmployeeByDocumentExcludingId(
      data.document,
      id
    );

    if (emailExists || documentExists) {
      return {
        error: {
          ...(emailExists && { email: ['Email already exists'] }),
          ...(documentExists && { document: ['Document already exists'] }),
        },
      };
    }

    await updateEmployeeRecord(id, validatedData);
  } catch (error) {
    console.error('Error updating employee:', error);
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
    return { error: 'Failed to update employee' };
  }
  revalidatePath('/dashboard/employees');
  redirect('/dashboard/employees');
}
