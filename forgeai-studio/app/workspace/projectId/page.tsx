import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import FileExplorer from "@/components/workspace/FileExplorer";

export default async function WorkspacePage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const { projectId } = await params;

  const project = await prisma.project.findUnique({
    where: { id: projectId, userId: session.user.id },
    include: { files: true },
  });

  if (!project) {
    return <div className="p-8 text-red-500">Project not found or access denied.</div>;
  }

  return (
    <div className="flex h-screen bg-white">
      <div className="w-80 border-r border-gray-200 p-4 overflow-y-auto bg-gray-50">
        <h2 className="font-bold text-lg truncate">{project.name}</h2>
        <p className="text-sm text-gray-500 mb-2">Status: {project.status}</p>
        <FileExplorer files={project.files} projectId={project.id} />
      </div>
      <div className="flex-1 p-6 overflow-auto">
        <p className="text-gray-400 text-center mt-20">
          👈 Select a file from the sidebar to view its content.
        </p>
      </div>
    </div>
  );
}