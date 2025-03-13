import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: id },
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!employee) {
      return NextResponse.json(
        { error: 'Employee not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ employee }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to fetch employee',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, email, document } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Employee ID is required' },
        { status: 400 }
      );
    }

    const emailExists = await prisma.employee.findFirst({
      where: {
        email,
        NOT: { id },
      },
    });

    const documentExists = await prisma.employee.findFirst({
      where: {
        document,
        NOT: { id },
      },
    });

    if (emailExists || documentExists) {
      return NextResponse.json(
        { error: 'Email or document already exists' },
        { status: 409 }
      );
    }

    const employee = await prisma.employee.update({
      where: { id },
      data: body,
      include: {
        department: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return NextResponse.json({ employee }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Employee ID is required' },
        { status: 400 }
      );
    }

    await prisma.employee.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to delete employee' },
      { status: 400 }
    );
  }
}
