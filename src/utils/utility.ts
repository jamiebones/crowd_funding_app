import dayjs from "dayjs";


function clipTextToWords(text: string, wordLimit: number) {
    const words = text.split(/\s+/);
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  }

  function getDaysBetweenEpochAndCurrent(epochTimestamp: number):number {
    // console.log("epoch time ", epochTimestamp)
    const epochDate = dayjs.unix(epochTimestamp / 1000);
    const currentDate = dayjs();
    const daysDifference = epochDate.diff(currentDate, 'day');
    return daysDifference > 0 ? daysDifference: 0;
  }
  
  export { clipTextToWords, getDaysBetweenEpochAndCurrent}