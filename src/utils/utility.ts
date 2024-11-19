import dayjs from "dayjs";


function clipTextToWords(text: string = "Hello world", wordLimit: number) {
    const words = text.split(/\s+/);
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  }

  function getDaysBetweenEpochAndCurrent(epochTimestamp: number):number {
    const epochDate = dayjs.unix(epochTimestamp / 1000);
    const currentDate = dayjs();
    const daysDifference = epochDate.diff(currentDate, 'day');
    return daysDifference > 0 ? daysDifference: 0;
  }

  const isPdf = (url: string = "") => {
    const spString = url.split(":");
    if (spString && spString[1].includes("pdf")) {
      return true;
    }
    return false;
  };

  const countUniqueBackers = function countUniqueBackers(array = []) {
    let nondubArray = []
    for (let i=0; i < array.length; i++){
      const donor = array[i].donor;
      if (!nondubArray.includes(donor)){
        nondubArray.push(donor)
      }
    }
    return nondubArray.length;
  }
  
  
  export { clipTextToWords, getDaysBetweenEpochAndCurrent, isPdf, countUniqueBackers}