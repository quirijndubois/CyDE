

// script.js
document.getElementById('latex-input').addEventListener('input', function() {
    const latexInput = this.value;
    
    // Set the content of the preview
    document.getElementById('latex-preview').innerHTML = latexInput;

});
