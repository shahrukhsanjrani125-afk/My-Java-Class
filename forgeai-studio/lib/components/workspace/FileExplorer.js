"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FileExplorer;
const react_1 = require("react");
const react_2 = require("react");
function FileExplorer({ files, projectId, }) {
    const [selectedFile, setSelectedFile] = (0, react_1.useState)(null);
    const [filterExt, setFilterExt] = (0, react_1.useState)("");
    const filteredFiles = filterExt
        ? files.filter((f) => f.path.endsWith(`.${filterExt}`))
        : files;
    const handleDownload = async () => {
        const res = await fetch(`/api/export/${projectId}`);
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "project.zip";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    };
    return (0, react_2.createElement)("div", null, (0, react_2.createElement)("div", { className: "mb-3 space-y-2" }, (0, react_2.createElement)("input", {
        type: "text",
        placeholder: 'Filter by ext (e.g., "tsx")',
        className: "w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        value: filterExt,
        onChange: (event) => setFilterExt(event.target.value),
    }), (0, react_2.createElement)("button", {
        onClick: handleDownload,
        className: "w-full bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 rounded transition",
    }, "⬇ Download ZIP")), (0, react_2.createElement)("ul", { className: "space-y-0.5 max-h-[60vh] overflow-y-auto" }, filteredFiles.length === 0
        ? (0, react_2.createElement)("li", { key: "empty", className: "text-gray-400 text-sm p-2" }, "No files match.")
        : filteredFiles.map((file) => (0, react_2.createElement)("li", {
            key: file.id,
            className: `cursor-pointer p-2 rounded text-sm font-mono truncate hover:bg-blue-100 transition ${selectedFile?.id === file.id ? "bg-blue-200 font-semibold" : ""}`,
            onClick: () => setSelectedFile(file),
        }, `📄 ${file.path}`))), selectedFile
        ? (0, react_2.createElement)("div", { className: "mt-4 border-t border-gray-200 pt-4" }, (0, react_2.createElement)("h3", { className: "font-semibold text-sm bg-gray-200 p-2 rounded-t truncate" }, selectedFile.path), (0, react_2.createElement)("pre", {
            className: "bg-gray-50 p-3 text-xs rounded-b overflow-auto max-h-[50vh] border border-gray-200 whitespace-pre-wrap",
        }, selectedFile.content))
        : null);
}
