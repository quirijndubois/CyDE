
function addFileDiv(name) {
    const fileDiv = document.createElement('div');
    fileDiv.classList.add('file');
    fileDiv.innerHTML = '<img src="icons/file.svg" class="filebrowser-icon"> ' + name;
    document.querySelector('nav').appendChild(fileDiv);
}

function updatePreview() {
    // const latexInput = document.getElementById('code-field').value;
    // document.getElementById('preview-field').innerHTML = latexInput;
    // MathJax.typesetPromise();
    document.getElementById('preview-field').src = document.getElementById('preview-field').src
}

document.getElementById('code-field').addEventListener('input', function () {
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
    displayLineNumbers();
})

const domain = 'http://localhost:8000';

testApi()
getFiles()

const saveFileButton = document.querySelector('#save-file-button');
saveFileButton.addEventListener('click', saveCurrentFile)


const comileFileButton = document.querySelector('#compile-file-button');
comileFileButton.addEventListener('click', compileCurrentFile)
