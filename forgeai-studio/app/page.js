"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Home;
const react_1 = require("react");
const navigation_1 = require("next/navigation");
function Home() {
    const [requirement, setRequirement] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const router = (0, navigation_1.useRouter)();
    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!requirement.trim())
            return;
        setLoading(true);
        try {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ requirement }),
            });
            const data = await res.json();
            if (data.success && data.projectId) {
                router.push(`/workspace/${data.projectId}`);
            }
            else {
                alert("Error: " + (data.error || "Unknown error"));
            }
        }
        catch (error) {
            alert("Network error. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-5xl font-bold text-center text-gray-800">
          ⚡ ForgeAI Studio
        </h1>
        <p className="text-center text-gray-500 mt-2 text-lg">
          Describe your idea. AI builds the foundation.
        </p>
        <form onSubmit={handleGenerate} className="mt-8">
          <textarea className="w-full h-56 border border-gray-300 rounded-xl p-5 text-gray-700 focus:ring-4 focus:ring-blue-500 focus:border-transparent transition text-lg" placeholder='E.g., "Build a task management app with teams, boards, and real-time notifications."' value={requirement} onChange={(e) => setRequirement(e.target.value)} disabled={loading}/>
          <button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition duration-200 text-lg disabled:opacity-50 disabled:cursor-not-allowed" disabled={loading || !requirement.trim()}>
            {loading ? "🚀 Generating Project..." : "✨ Generate Project"}
          </button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-4">
          {loading ? "This may take 10-20 seconds..." : "Powered by Google Gemini"}
        </p>
      </div>
    </div>);
}
