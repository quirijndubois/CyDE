
function addFileDiv(name) {


    const fileDiv = document.createElement('div');
    fileDiv.classList.add('file');
    fileDiv.innerHTML = '<img src="icons/folder.svg" class="filebrowser-icon"> ' + name;
    document.querySelector('.filebrowser').appendChild(fileDiv);
}

function getFileContents(name) {
    fetch('../filesystem/' + name)
        .then(response => response.text())
        .then(data => {
            document.getElementById('code-field').value = data;
        })
}

function getFiles() {
    fetch('files.txt')
        .then(response => response.text())
        .then(data => {
            const filesInFilesystem = data.split('\n');

            filesInFilesystem.forEach(file => {
                if (file) {
                    addFileDiv(file);
                }
            })
        })

}

function updatePreview() {
    const latexInput = document.getElementById('code-field').value;
    document.getElementById('preview-field').innerHTML = latexInput;
    MathJax.typesetPromise();

}

getFiles();

document.getElementById('code-field').addEventListener('input', function () {
    updatePreview();
    displayLineNumbers()
});


function makeFileInteractive() {
    const files = document.querySelectorAll('.file');
    files.forEach((file) => {
        file.addEventListener('click', () => {
            if (file.classList.contains('selected')) {
                return;
            }
            files.forEach((f) => f.classList.remove('selected'));

            file.classList.add('selected');

            const name = file.innerText;
            getFileContents(name);

            setTimeout(() => {
                updatePreview();
                displayLineNumbers();
            }, 100);
        });
    });
}

setTimeout(() => {
    makeFileInteractive();
}, 200)


// make close button on popup work

const popupBackground = document.querySelector('.popup-background');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup-close');
popupClose.addEventListener('click', () => {
    popupBackground.style.display = 'none';
    popup.style.display = 'none';
})

// open popup on settings button click

const settingsButton = document.querySelector('#settings-button');
settingsButton.addEventListener('click', () => {
    popupBackground.style.display = 'block';
    popup.style.display = 'block';
})

// make the #open-file button work, allowing you to upload a file and putting that file in the text area
const openFileButton = document.querySelector('#open-file-button');
openFileButton.addEventListener('click', () => {
    const file = document.createElement('input');
    file.type = 'file';
    file.click();
    file.addEventListener('change', () => {
        const reader = new FileReader();
        reader.onload = () => {
            document.getElementById('code-field').value = reader.result;
            updatePreview();
            displayLineNumbers();
        }
        reader.readAsText(file.files[0]);
    })
})

// make the #new-file button work
const newFileButton = document.querySelector('#new-file-button');
newFileButton.addEventListener('click', () => {
    document.getElementById('code-field').value = '';
    document.querySelectorAll('.file').forEach((file) => {
        file.classList.remove('selected');
    })
    updatePreview();
    displayLineNumbers();
})



