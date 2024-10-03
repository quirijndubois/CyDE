const domain = 'http://127.0.0.1:8000';

async function testApi() {
    try {
        const response = await fetch(`${domain}/`);
        const data = await response.json();
        console.log(`succesful API response from ${domain}`);
    } catch (error) {
        console.error('Error:', error);
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

testApi()
getFiles()

const saveFileButton = document.querySelector('#save-file-button');
saveFileButton.addEventListener('click', () => {
    // get the active file
    const activeFile = document.querySelector('.file.selected');
    if (activeFile) {
        const name = activeFile.innerText;
        saveFile(name);
    }
    else {
        console.log("no file selected")
    }
})