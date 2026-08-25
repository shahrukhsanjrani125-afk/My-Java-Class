import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import archiver from "archiver";
import { PassThrough, Readable } from "stream";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get project ID from URL
    const { projectId } = await params;

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    // Fetch only the project owned by the logged-in user
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: session.user.id,
      },
      include: {
        files: true,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Create ZIP archive
    const archive = archiver("zip", {
      zlib: {
        level: 9,
      },
    });

    // PassThrough lets us convert the Node stream
    // into a Web ReadableStream for NextResponse
    const output = new PassThrough();

    archive.on("error", (error) => {
      output.destroy(error);
    });

    archive.pipe(output);

    // Add project files to ZIP
    for (const file of project.files) {
      archive.append(file.content ?? "", {
        name: file.path,
      });
    }

    // Finalize archive
    await archive.finalize();

    // Convert Node.js stream to Web stream
    const webStream = Readable.toWeb(output) as ReadableStream;

    // Safe filename
    const safeProjectName =
      project.name
        ?.replace(/[^a-zA-Z0-9-_ ]/g, "")
        .trim()
        .replace(/\s+/g, "_") || "forgeai-project";

    return new NextResponse(webStream, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${safeProjectName}.zip"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Project export error:", error);

    return NextResponse.json(
      {
        error: "Failed to export project",
      },
      {
        status: 500,
      }
    );
  }
}