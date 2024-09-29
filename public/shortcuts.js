function getLineIndex(text, index) {
    // Make sure the index is valid
    if (index < 0 || index >= text.length) {
        return -1; // Invalid index
    }

    // Split the text into lines
    const lines = text.split('\n');

    let currentIndex = 0;

    // Loop through each line
    for (let i = 0; i < lines.length; i++) {
        // Check if the index is within the current line
        if (index < currentIndex + lines[i].length + 1) { // +1 accounts for the newline character
            return i + 1; // Return the line number (1-based index)
        }

        // Move to the next line
        currentIndex += lines[i].length + 1; // +1 for the newline character
    }

    return -1; // If something goes wrong (this shouldn't happen)
}

function getCharIndexAtLine(text, lineNumber) {
    // Split the text into lines
    const lines = text.split('\n');

    // Make sure the line number is valid
    if (lineNumber < 1 || lineNumber > lines.length) {
        return -1; // Invalid line number
    }

    let currentIndex = 0;

    // Loop through the lines to accumulate the character index
    for (let i = 1; i < lineNumber; i++) {
        // Add the length of each previous line and a newline character
        currentIndex += lines[i - 1].length + 1; // +1 for the '\n' character
    }

    return currentIndex;
}

function swapLines(text, line1, line2) {
    const lines = text.split('\n');
    const temp = lines[line1 - 1];
    lines[line1 - 1] = lines[line2 - 1];
    lines[line2 - 1] = temp;
    return lines.join('\n');
}

// ctrl+x removes the enitere line where the cursor is and copies it:
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'x') {
        console.log('ctrl+x pressed');
        // get the line where cursor is located
        const textarea = document.getElementById('code-field');
        const cursorPosition = textarea.selectionStart;
        const line = textarea.value.substring(0, cursorPosition).split('\n').slice(-1)[0];
        const beforeLine = textarea.value.substring(0, cursorPosition).split('\n').slice(0, -1).join('\n');
        const afterLine = textarea.value.substring(cursorPosition).split('\n').slice(1).join('\n');
        textarea.value = beforeLine + '\n' + afterLine;

        // add line to the clipboard
        navigator.clipboard.writeText(line);
    }
})

// alt+up and alt+down moves the line where the cursor is located up and down
document.addEventListener('keydown', (event) => {
    if (event.altKey && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
        const textarea = document.getElementById('code-field');
        const lines = textarea.value.split('\n');
        const lineIndex = getLineIndex(textarea.value, textarea.selectionStart);

        if (event.key === 'ArrowUp' && lineIndex > 1) {
            textarea.value = swapLines(textarea.value, lineIndex, lineIndex - 1);
            textarea.selectionStart = textarea.selectionEnd = getCharIndexAtLine(textarea.value, lineIndex - 1);
        } else if (event.key === 'ArrowDown' && lineIndex < lines.length) {
            textarea.value = swapLines(textarea.value, lineIndex, lineIndex + 1);
            textarea.selectionStart = textarea.selectionEnd = getCharIndexAtLine(textarea.value, lineIndex + 1);

        }
        displayLineNumbers();
    }
})