from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from pydantic import BaseModel

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/files/")
def get_files():
    dir_path = Path("filesystem")
    files = [file.name for file in dir_path.iterdir() if file.is_file()]
    return {"files": files}


class FileSaveRequest(BaseModel):
    file_content: str
    file_path: str


@app.post("/save-file/")
def save_file(request: FileSaveRequest):
    # Convert the file path string to a Path object
    file_path = Path("filesystem/"+request.file_path)

    file_path.parent.mkdir(parents=True, exist_ok=True)

    print(f"Saving file to {file_path}")
    with file_path.open("w", encoding="utf-8") as file:
        file.write(request.file_content)

    return {"message": f"File saved successfully at {file_path}"}


class CompileFileRequest(BaseModel):
    file_path: str


@app.post("/compile-file/")
def compile_file(request: CompileFileRequest):
    file_path = Path("filesystem/"+request.file_path)
    print(file_path)


@app.post("/compile-file/")
def compile_file(request: CompileFileRequest):
    content = request.file_content
    print(content)


@app.get("/get-file/{file_path}")
def get_file(file_path: str):
    # Convert the file path string to a Path object
    file_path = Path("filesystem/"+file_path)

    file_content = file_path.read_text(encoding="utf-8")
    return {"file_content": file_content}
