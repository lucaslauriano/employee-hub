import { prisma } from '@/lib/prisma';
import type { DepartmentFormData } from './schema';

export type DepartmentWithManager = {
  id: string;
  name: string;
  managerId: string | null;
  manager_id: string | null;
  manager_first_name: string | null;
  manager_last_name: string | null;
  employee_count: bigint;
};

export async function findDepartmentsWithManagers(): Promise<
  DepartmentWithManager[]
> {
  return prisma.$queryRaw<DepartmentWithManager[]>`
    SELECT 
      d.*,
      e.id as manager_id,
      e."firstName" as manager_first_name,
      e."lastName" as manager_last_name,
      COUNT(emp.id) as employee_count
    FROM departments d
    LEFT JOIN employees e ON d."managerId"::uuid = e.id
    LEFT JOIN employees emp ON emp."departmentId"::uuid = d.id
    GROUP BY d.id, e.id, e."firstName", e."lastName"
  `;
}

export async function findDepartmentById(id: string) {
  return prisma.departments.findUnique({
    where: { id },
  });
}

export async function findDepartmentByName(name: string) {
  return prisma.departments.findFirst({
    where: { name },
  });
}

export async function findDepartmentByNameExcludingId(
  name: string,
  id: string
) {
  return prisma.departments.findFirst({
    where: {
      name,
      NOT: { id },
    },
  });
}

export async function findDepartmentByManagerId(managerId: string) {
  return prisma.departments.findFirst({
    where: { managerId },
  });
}

export async function findDepartmentByManagerIdExcludingId(
  managerId: string,
  id: string
) {
  return prisma.departments.findFirst({
    where: {
      managerId,
      NOT: { id },
    },
  });
}

export async function createDepartmentRecord(data: DepartmentFormData) {
  return prisma.departments.create({
    data,
  });
}

export async function updateDepartmentRecord(
  id: string,
  data: DepartmentFormData
) {
  return prisma.departments.update({
    where: { id },
    data,
  });
}

export async function findAllEmployees() {
  return prisma.employee.findMany({
    orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
  });
}

export async function findAllDepartments() {
  return prisma.departments.findMany({
    orderBy: { name: 'asc' },
  });
}
