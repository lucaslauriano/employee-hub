'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { departmentSchema } from './schema';
import {
  createDepartmentRecord,
  findDepartmentByName,
  findDepartmentByManagerId,
  findDepartmentByNameExcludingId,
  findDepartmentByManagerIdExcludingId,
  updateDepartmentRecord,
} from './services';

export type ActionResponse = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};

export async function createDepartment(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const rawData = {
      name: formData.get('name') as string,
      managerId: (formData.get('managerId') as string) || null,
    };

    const validatedData = departmentSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const nameExists = await findDepartmentByName(validatedData.data.name);
    const managerExists = validatedData.data.managerId
      ? await findDepartmentByManagerId(validatedData.data.managerId)
      : null;

    if (nameExists || managerExists) {
      return {
        success: false,
        message: 'Validation failed',
        errors: {
          ...(nameExists && {
            name: ['Department with this name already exists'],
          }),
          ...(managerExists && {
            managerId: [
              'This manager is already assigned to another department',
            ],
          }),
        },
      };
    }

    await createDepartmentRecord(validatedData.data);

    return {
      success: true,
      message: 'Department created successfully!',
    };
  } catch (error) {
    console.error('Error creating department:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  } finally {
    revalidatePath('/dashboard/departments');
    redirect('/dashboard/departments');
  }
}

export async function updateDepartment(
  prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const id = formData.get('id') as string;
    const rawData = {
      name: formData.get('name') as string,
      managerId: (formData.get('managerId') as string) || null,
    };

    const validatedData = departmentSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: 'Please fix the errors in the form',
        errors: validatedData.error.flatten().fieldErrors,
      };
    }

    const nameExists = await findDepartmentByNameExcludingId(
      validatedData.data.name,
      id
    );
    const managerExists = validatedData.data.managerId
      ? await findDepartmentByManagerIdExcludingId(
          validatedData.data.managerId,
          id
        )
      : null;

    if (nameExists || managerExists) {
      return {
        success: false,
        message: 'Validation failed',
        errors: {
          ...(nameExists && {
            name: ['Department with this name already exists'],
          }),
          ...(managerExists && {
            managerId: [
              'This manager is already assigned to another department',
            ],
          }),
        },
      };
    }

    await updateDepartmentRecord(id, validatedData.data);

    return {
      success: true,
      message: 'Department updated successfully!',
    };
  } catch (error) {
    console.error('Error updating department:', error);
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  } finally {
    revalidatePath('/dashboard/departments');
    redirect('/dashboard/departments');
  }
}
