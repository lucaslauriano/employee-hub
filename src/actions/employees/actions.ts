'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { employeeSchema } from './schema';
import {
  createEmployeeRecord,
  findEmployeeByEmail,
  findEmployeeByDocument,
  findEmployeeByEmailExcludingId,
  findEmployeeByDocumentExcludingId,
  updateEmployeeRecord,
} from './services';

export type ActionResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function createEmployee(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const rawData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      document: formData.get('document') as string,
      phone: formData.get('phone') as string,
      departmentId: (formData.get('departmentId') as string) || null,
    };

    const validatedData = employeeSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const emailExists = await findEmployeeByEmail(validatedData.data.email);
    const documentExists = await findEmployeeByDocument(
      validatedData.data.document
    );

    if (emailExists || documentExists) {
      return {
        success: false,
        message: 'Validation failed',
        errors: {
          ...(emailExists && { email: ['Email already exists'] }),
          ...(documentExists && { document: ['Document already exists'] }),
        },
      };
    }

    await createEmployeeRecord(validatedData.data);

    return {
      success: true,
      message: 'Employee created successfully!',
    };
  } catch (error) {
    console.error('Error creating employee:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  } finally {
    revalidatePath('/dashboard/employees');
    redirect('/dashboard/employees');
  }
}

export async function updateEmployee(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const id = formData.get('id') as string;
    const rawData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      document: formData.get('document') as string,
      phone: formData.get('phone') as string,
      departmentId: (formData.get('departmentId') as string) || null,
    };

    const validatedData = employeeSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const emailExists = await findEmployeeByEmailExcludingId(
      validatedData.data.email,
      id
    );
    const documentExists = await findEmployeeByDocumentExcludingId(
      validatedData.data.document,
      id
    );

    if (emailExists || documentExists) {
      return {
        success: false,
        message: 'Validation failed',
        errors: {
          ...(emailExists && { email: ['Email already exists'] }),
          ...(documentExists && { document: ['Document already exists'] }),
        },
      };
    }

    await updateEmployeeRecord(id, validatedData.data);

    return {
      success: true,
      message: 'Employee updated successfully!',
    };
  } catch (error) {
    console.error('Error updating employee:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  } finally {
    revalidatePath('/dashboard/employees');
    redirect('/dashboard/employees');
  }
}
