import { prisma } from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const department = await prisma.departments.create({
      data: body,
    });

    return NextResponse.json({ department }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create department' },
      { status: 400 }
    );
  }
}

export async function GET() {
  try {
    const departments = await prisma.departments.findMany({
      include: {
        employee: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return NextResponse.json({ departments }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    );
  }
}
