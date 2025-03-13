import { prisma } from '@/lib/prisma';
import type { EmployeeFormData } from './schema';

export async function findEmployeeById(id: string) {
  return prisma.employee.findUnique({
    where: { id },
  });
}

export async function findEmployeeByEmail(email: string) {
  return prisma.employee.findFirst({
    where: { email },
  });
}

export async function findEmployeeByDocument(document: string) {
  return prisma.employee.findFirst({
    where: { document },
  });
}

export async function findEmployeeByEmailExcludingId(
  email: string,
  id: string
) {
  return prisma.employee.findFirst({
    where: {
      email,
      NOT: { id },
    },
  });
}

export async function findEmployeeByDocumentExcludingId(
  document: string,
  id: string
) {
  return prisma.employee.findFirst({
    where: {
      document,
      NOT: { id },
    },
  });
}

export async function createEmployeeRecord(data: EmployeeFormData) {
  return prisma.employee.create({
    data,
  });
}

export async function updateEmployeeRecord(id: string, data: EmployeeFormData) {
  return prisma.employee.update({
    where: { id },
    data,
  });
}

export async function findAllEmployees() {
  return prisma.employee.findMany({
    include: {
      department: {
        select: {
          name: true,
        },
      },
    },
  });
}
