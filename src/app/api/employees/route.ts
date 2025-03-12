import { prisma } from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, document } = body;

    const emailExists = await prisma.employee.findUnique({
      where: { email },
      select: { id: true, email: true },
    });

    const documentExists = await prisma.employee.findUnique({
      where: { document },
      select: { id: true, document: true },
    });

    if (emailExists || documentExists) {
      return NextResponse.json(
        { error: 'Email or document already exists' },
        { status: 409 }
      );
    }

    const employee = await prisma.employee.create({
      data: body,
    });

    return NextResponse.json({ employee }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        department: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ employees }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
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
