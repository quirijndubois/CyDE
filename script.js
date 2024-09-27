

document.getElementById('MathJax-script').addEventListener('load', function () {
    let defaultText =
        `The schrodinger equation: 
\\[
-\\frac{\\hbar^2}{2m} \\frac{d^2 \\psi}{dx^2} + V\\psi = E\\psi\\\\
\\]`

    document.getElementById('code-field').value = defaultText;
    document.getElementById('preview-field').innerHTML = defaultText;
    MathJax.typesetPromise();
});

document.getElementById('code-field').addEventListener('input', function () {
    const latexInput = this.value;

    document.getElementById('preview-field').innerHTML = latexInput;

    MathJax.typesetPromise();
});

// Get all file elements
const files = document.querySelectorAll('.file');

// Add an onclick event listener to each file element
files.forEach((file) => {
    file.addEventListener('click', () => {
        // Remove the 'selected' class from all files
        files.forEach((f) => f.classList.remove('selected'));

        // Add the 'selected' class to the clicked file
        file.classList.add('selected');
    });
});


