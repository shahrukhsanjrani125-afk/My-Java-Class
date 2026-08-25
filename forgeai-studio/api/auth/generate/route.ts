import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { generateProjectFromRequirement } from "@/lib/ai/gemini";
import { z } from "zod";

const schema = z.object({
  requirement: z.string().min(10, "Requirement too short"),
});

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
  }

  const { requirement } = parsed.data;

  // 1. Create project
  const project = await prisma.project.create({
    data: {
      name: "New Project",
      description: requirement.slice(0, 100),
      userId: session.user.id,
      status: "generating",
      requirements: requirement,
    },
  });

  try {
    // 2. Call Gemini
    const aiOutput = await generateProjectFromRequirement(requirement);

    // 3. Update project name
    await prisma.project.update({
      where: { id: project.id },
      data: {
        name: aiOutput.projectName || "Generated Project",
        description: aiOutput.description || project.description,
      },
    });

    // 4. Save files
    for (const file of aiOutput.files) {
      await prisma.projectFile.create({
        data: {
          projectId: project.id,
          path: file.path,
          content: file.content,
          language: file.path.split('.').pop() || '',
        },
      });
    }

    // 5. Mark as ready
    await prisma.project.update({
      where: { id: project.id },
      data: { status: "ready" },
    });

    return NextResponse.json({
      success: true,
      projectId: project.id,
      fileCount: aiOutput.files.length,
    });

  } catch (error: any) {
    await prisma.project.update({
      where: { id: project.id },
      data: { status: "failed" },
    });
    return NextResponse.json(
      { error: error.message || "Generation failed" },
      { status: 500 }
    );
  }
}