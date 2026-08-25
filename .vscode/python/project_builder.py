cat << 'EOF' > project_builder.py
import os
import sys
import openpyxl
from docx import Document
from google import genai

def create_project_structure(project_name, prompt):
    client = genai.Client()
    
    print(f"[*] Analyzing project structure for '{project_name}' via Gemini API...")
    
    system_instruction = (
        "You are an expert software architect and project manager. "
        "The user wants to build a project. Based on their prompt, output a structured JSON-like or clearly formatted "
        "list of files and folders to create, followed by the content of each file. "
        "Use this exact format for each file:\n"
        "---FILE: path/to/filename.ext---\n"
        "[Full production-ready code or content for that file]\n"
        "---END---\n"
        "Ensure you include appropriate files (e.g., .py, .java, .html, .xlsx, .docx, README.md) based on the project requirements."
    )
    
    response = client.models.generate_content(
        model='gemini-2.5-flash',
        contents=f"{system_instruction}\n\nProject Prompt: {prompt}"
    )
    
    response_text = response.text
    
    # Create root project folder
    if not os.path.exists(project_name):
        os.makedirs(project_name)
        
    # Parse files from Gemini's response
    parts = response_text.split("---FILE:")
    
    created_files = 0
    for part in parts[1:]:
        if "---END---" not in part:
            continue
        header, content_block = part.split("---END---", 1)
        filepath = header.strip()
        
        # Clean up file content (strip markdown code blocks if wrapped around the whole block)
        file_content = content_block.strip()
        
        # Full path inside project directory
        full_path = os.path.join(project_name, filepath)
        
        # Ensure subdirectories exist
        dir_name = os.path.dirname(full_path)
        if dir_name and not os.path.exists(dir_name):
            os.makedirs(dir_name)
            
        ext = os.path.splitext(full_path)[1].lower()
        
        # Handle specialized file types
        if ext == '.xlsx':
            wb = openpyxl.Workbook()
            ws = wb.active
            ws.title = "Data"
            for i, line in enumerate(file_content.splitlines(), start=1):
                ws.cell(row=i, column=1, value=line)
            wb.save(full_path)
        elif ext == '.docx':
            doc = Document()
            for p in file_content.split('\n\n'):
                doc.add_paragraph(p)
            doc.save(full_path)
        else:
            # Clean markdown ticks if present inside code files
            if file_content.startswith("```"):
                lines = file_content.splitlines()
                if lines[0].startswith("```"):
                    lines = lines[1:]
                if lines and lines[-1].startswith("```"):
                    lines = lines[:-1]
                file_content = "\n".join(lines)
                
            with open(full_path, "w", encoding="utf-8") as f:
                f.write(file_content)
                
        print(f"[+] Created: {full_path}")
        created_files += 1

    print(f"\n[✨] Success! Project '{project_name}' successfully built with {created_files} files inside VS Code workspace.")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 project_builder.py <project_folder_name> 'Your project description/prompt'")
        sys.exit(1)
        
    proj_name = sys.argv[1]
    proj_prompt = " ".join(sys.argv[2:])
    create_project_structure(proj_name, proj_prompt)
EOF