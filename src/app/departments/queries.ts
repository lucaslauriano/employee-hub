import { prisma } from '@/lib/prisma';

export type DepartmentWithManager = {
  id: string;
  name: string;
  managerId: string | null;
  manager_id: string | null;
  manager_first_name: string | null;
  manager_last_name: string | null;
  employee_count: bigint;
};

export async function getDepartmentsWithManagers(): Promise<
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
