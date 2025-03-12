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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Department ID is required' },
        { status: 400 }
      );
    }

    const department = await prisma.departments.update({
      where: { id },
      data: body,
      include: {
        employee: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json({ department }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update department' },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Department ID is required' },
        { status: 400 }
      );
    }

    await prisma.departments.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete department' },
      { status: 400 }
    );
  }
}
