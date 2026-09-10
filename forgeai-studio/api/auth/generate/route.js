"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = POST;
const server_1 = require("next/server");
const next_auth_1 = require("next-auth");
const route_1 = require("../auth/[...nextauth]/route");
const db_1 = require("@/lib/db");
const gemini_1 = require("@/lib/ai/gemini");
const zod_1 = require("zod");
const schema = zod_1.z.object({
    requirement: zod_1.z.string().min(10, "Requirement too short"),
});
async function POST(req) {
    const session = await (0, next_auth_1.getServerSession)(route_1.authOptions);
    if (!session) {
        return server_1.NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
        return server_1.NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }
    const { requirement } = parsed.data;
    // 1. Create project
    const project = await db_1.prisma.project.create({
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
        const aiOutput = await (0, gemini_1.generateProjectFromRequirement)(requirement);
        // 3. Update project name
        await db_1.prisma.project.update({
            where: { id: project.id },
            data: {
                name: aiOutput.projectName || "Generated Project",
                description: aiOutput.description || project.description,
            },
        });
        // 4. Save files
        for (const file of aiOutput.files) {
            await db_1.prisma.projectFile.create({
                data: {
                    projectId: project.id,
                    path: file.path,
                    content: file.content,
                    language: file.path.split('.').pop() || '',
                },
            });
        }
        // 5. Mark as ready
        await db_1.prisma.project.update({
            where: { id: project.id },
            data: { status: "ready" },
        });
        return server_1.NextResponse.json({
            success: true,
            projectId: project.id,
            fileCount: aiOutput.files.length,
        });
    }
    catch (error) {
        await db_1.prisma.project.update({
            where: { id: project.id },
            data: { status: "failed" },
        });
        return server_1.NextResponse.json({ error: error.message || "Generation failed" }, { status: 500 });
    }
}
