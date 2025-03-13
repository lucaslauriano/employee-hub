import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const department = await prisma.departments.findUnique({
      where: { id: id },
      include: {
        employee: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!department) {
      return NextResponse.json(
        { error: 'Department not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ department }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to fetch department',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, managerId } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Department ID is required' },
        { status: 400 }
      );
    }

    const existingDepartment = await prisma.departments.findUnique({
      where: { id },
    });

    if (!existingDepartment) {
      return NextResponse.json(
        { error: 'Department not found' },
        { status: 404 }
      );
    }

    const department = await prisma.departments.update({
      where: { id },
      data: {
        name,
        managerId,
      },
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
  } catch (error) {
    console.error('Error updating department:', error);
    return NextResponse.json(
      { error: 'Failed to update department' },
      { status: 500 }
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
