
async function testApi() {
    try {
        const response = await fetch(`${domain}/`);
        const data = await response.json();
        console.log(`succesful API response from ${domain}`);
    } catch (error) {
        console.log(`failed to get API response from ${domain}`);
    }
}

async function getFiles() {
    try {
        const response = await fetch(`${domain}/files/`);
        const data = await response.json();

        if (response.ok) {

            data.files.forEach(file => {
                if (file) {
                    addFileDiv(file);
                }
            })
        } else {
            console.error('Error:', data.error);
        }
    } catch (error) {
        console.error('Error fetching files:', error);
    }
}

function saveFile(name) {
    const code = document.getElementById('code-field').value;
    const data = {
        file_content: code,
        file_path: name
    };

    fetch(`${domain}/save-file/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

function compileFile(name) {
    const code = document.getElementById('code-field').value;
    const data = {
        file_path: name
    };

    fetch(`${domain}/compile-file/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.text())
        .then(data => {
            updatePreview();
        })
}

function getFileContents(name) {
    fetch(`${domain}/get-file/${name}`)
        .then(response => response.text())
        .then(data => {
            // convert data to a dict
            data = JSON.parse(data);
            document.getElementById('code-field').value = data["file_content"];
        })
}

function saveCurrentFile() {
    // get the active file
    const activeFile = document.querySelector('.file.selected');
    if (activeFile) {
        const name = activeFile.innerText;
        saveFile(name);
    }
    else {
        console.log("no file selected")
    }
    compileCurrentFile();
}

function compileCurrentFile() {
    const activeFile = document.querySelector('.file.selected');
    if (activeFile) {
        const name = activeFile.innerText;
        compileFile(name);
    }
    else {
        console.log("no file selected")
    }
}