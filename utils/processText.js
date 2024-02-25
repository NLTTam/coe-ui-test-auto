function upperCase(str) {
    // Split into words, preserving hyphens within words
    const words = str.split(/\s(?=-)|-/);
  
    // Uppercase first letter of each word
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  
    // Join words with spaces, replacing hyphens in multi-word terms
    const joinedText = capitalizedWords.join(" ").replace(/-/g, " ");
  
    return joinedText;
}

module.exports = { upperCase }