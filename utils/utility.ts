
function clipTextToWords(text: string, wordLimit: number) {
    const words = text.split(/\s+/);
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  }
  
  export { clipTextToWords}