"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = GET;
const server_1 = require("next/server");
const next_auth_1 = require("next-auth");
const route_1 = require("@/app/api/auth/[...nextauth]/route");
const db_1 = require("@/lib/db");
const archiver_1 = __importDefault(require("archiver"));
const stream_1 = require("stream");
async function GET(req, { params }) {
    try {
        // Check authentication
        const session = await (0, next_auth_1.getServerSession)(route_1.authOptions);
        if (!session?.user?.id) {
            return server_1.NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        // Get project ID from URL
        const { projectId } = await params;
        if (!projectId) {
            return server_1.NextResponse.json({ error: "Project ID is required" }, { status: 400 });
        }
        // Fetch only the project owned by the logged-in user
        const project = await db_1.prisma.project.findFirst({
            where: {
                id: projectId,
                userId: session.user.id,
            },
            include: {
                files: true,
            },
        });
        if (!project) {
            return server_1.NextResponse.json({ error: "Project not found" }, { status: 404 });
        }
        // Create ZIP archive
        const archive = (0, archiver_1.default)("zip", {
            zlib: {
                level: 9,
            },
        });
        // PassThrough lets us convert the Node stream
        // into a Web ReadableStream for NextResponse
        const output = new stream_1.PassThrough();
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
        const webStream = stream_1.Readable.toWeb(output);
        // Safe filename
        const safeProjectName = project.name
            ?.replace(/[^a-zA-Z0-9-_ ]/g, "")
            .trim()
            .replace(/\s+/g, "_") || "forgeai-project";
        return new server_1.NextResponse(webStream, {
            status: 200,
            headers: {
                "Content-Type": "application/zip",
                "Content-Disposition": `attachment; filename="${safeProjectName}.zip"`,
                "Cache-Control": "no-store",
            },
        });
    }
    catch (error) {
        console.error("Project export error:", error);
        return server_1.NextResponse.json({
            error: "Failed to export project",
        }, {
            status: 500,
        });
    }
}
