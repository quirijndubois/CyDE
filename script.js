
function addFileDiv(name) {


    const fileDiv = document.createElement('div');
    fileDiv.classList.add('file');
    fileDiv.innerHTML = '<img src="icons/folder.svg" class="filebrowser-icon"> ' + name;
    document.querySelector('.filebrowser').appendChild(fileDiv);
}

function getFileContents(name) {
    fetch('filesystem/' + name)
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
});


window.onload = function () {
    const files = document.querySelectorAll('.file');
    files.forEach((file) => {
        file.addEventListener('click', () => {
            files.forEach((f) => f.classList.remove('selected'));

            file.classList.add('selected');

            const name = file.innerText;
            getFileContents(name);

            setTimeout(() => {
                updatePreview();
            }, 100);
        });
    });
}