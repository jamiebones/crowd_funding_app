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

  interface Donor {
     donor: string
  }

  const countUniqueBackers = function countUniqueBackers(array:Donor[] = []) {
    let nondubArray:string[] = []
    for (let i=0; i < array.length; i++){
      const donor = array[i].donor as string;
      if (!nondubArray.includes(donor)){
        nondubArray.push(donor)
      }
    }
    return nondubArray.length;
  }
  
  
  export { clipTextToWords, getDaysBetweenEpochAndCurrent, isPdf, countUniqueBackers}