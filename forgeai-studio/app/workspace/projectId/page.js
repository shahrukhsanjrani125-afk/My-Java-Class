"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WorkspacePage;
const next_auth_1 = require("next-auth");
const route_1 = require("@/app/api/auth/[...nextauth]/route");
const db_1 = require("@/lib/db");
const navigation_1 = require("next/navigation");
const FileExplorer_1 = __importDefault(require("@/components/workspace/FileExplorer"));
async function WorkspacePage({ params, }) {
    const session = await (0, next_auth_1.getServerSession)(route_1.authOptions);
    if (!session)
        (0, navigation_1.redirect)("/login");
    const { projectId } = await params;
    const project = await db_1.prisma.project.findUnique({
        where: { id: projectId, userId: session.user.id },
        include: { files: true },
    });
    if (!project) {
        return <div className="p-8 text-red-500">Project not found or access denied.</div>;
    }
    return (<div className="flex h-screen bg-white">
      <div className="w-80 border-r border-gray-200 p-4 overflow-y-auto bg-gray-50">
        <h2 className="font-bold text-lg truncate">{project.name}</h2>
        <p className="text-sm text-gray-500 mb-2">Status: {project.status}</p>
        <FileExplorer_1.default files={project.files} projectId={project.id}/>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <p className="text-gray-400 text-center mt-20">
          👈 Select a file from the sidebar to view its content.
        </p>
      </div>
    </div>);
}
