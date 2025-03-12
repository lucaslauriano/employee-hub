import { prisma } from '@/lib/prisma';
import { IEmployeeForm } from '@/types/employees';

export async function findEmployeeByEmail(email: string) {
  return prisma.employee.findUnique({
    where: { email },
    select: { id: true },
  });
}

export async function findEmployeeByDocument(document: string) {
  return prisma.employee.findUnique({
    where: { document },
    select: { id: true },
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
    select: { id: true },
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
    select: { id: true },
  });
}

export async function createEmployeeRecord(data: IEmployeeForm) {
  return prisma.employee.create({
    data,
  });
}

export async function updateEmployeeRecord(id: string, data: IEmployeeForm) {
  return prisma.employee.update({
    where: { id },
    data,
  });
}

export async function findEmployeeById(id: string) {
  return prisma.employee.findUnique({
    where: { id },
    include: {
      department: {
        select: {
          id: true,
          name: true,
        },
      },
    },
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
