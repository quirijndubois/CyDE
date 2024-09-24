

document.getElementById('MathJax-script').addEventListener('load', function() {
    defaultText = 'The schrodinger equation: \\[ -\\frac{\\hbar^2}{2m} \\frac{d^2 \\psi}{dx^2} + V\\psi = E\\psi\\\\ \\]'
    document.getElementById('latex-input').value = defaultText;
    document.getElementById('latex-preview').innerHTML = defaultText;
    MathJax.typesetPromise();
  });

document.getElementById('latex-input').addEventListener('input', function() {
    const latexInput = this.value;
    
    document.getElementById('latex-preview').innerHTML = latexInput;
    
    MathJax.typesetPromise();
});

