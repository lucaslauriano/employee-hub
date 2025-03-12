'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  departmentSchema,
  type ActionResponse,
  type ValidationErrors,
} from './schema';
import { z } from 'zod';
import { Prisma } from '@prisma/client';

export async function createDepartment(
  data: Parameters<typeof departmentSchema.parse>[0]
): Promise<ActionResponse> {
  try {
    const validatedData = await departmentSchema.parseAsync(data);

    // Check if department with same name exists
    const nameExists = await prisma.departments.findFirst({
      where: { name: validatedData.name },
    });

    if (nameExists) {
      return {
        error: {
          name: ['Department with this name already exists'],
        },
      };
    }

    // Check if manager is already assigned to another department
    if (validatedData.managerId) {
      const managerExists = await prisma.departments.findFirst({
        where: { managerId: validatedData.managerId },
      });

      if (managerExists) {
        return {
          error: {
            managerId: [
              'This manager is already assigned to another department',
            ],
          },
        };
      }
    }

    await prisma.departments.create({
      data: validatedData,
    });

    revalidatePath('/departments');
    redirect('/departments');
  } catch (error) {
    console.error('Failed to create department:', error);
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
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      return {
        error: {
          managerId: ['This manager is already assigned to another department'],
        },
      };
    }
    return { error: 'Failed to create department' };
  }
}

export async function updateDepartment(
  id: string,
  data: Parameters<typeof departmentSchema.parse>[0]
): Promise<ActionResponse> {
  try {
    const validatedData = await departmentSchema.parseAsync(data);

    // Check if department with same name exists (excluding current department)
    const nameExists = await prisma.departments.findFirst({
      where: {
        name: validatedData.name,
        NOT: { id },
      },
    });

    if (nameExists) {
      return {
        error: {
          name: ['Department with this name already exists'],
        },
      };
    }

    await prisma.departments.update({
      where: { id },
      data: validatedData,
    });

    revalidatePath('/departments');
    redirect('/departments');
  } catch (error) {
    console.error('Failed to update department:', error);
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
    return { error: 'Failed to update department' };
  }
}
