"use client"
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

  interface DonorRecall {
    donor: string;
  }


  function countUniqueDonors(arrayOne: Donor[] = [], arrayTwo: DonorRecall[] = []) {
      const frequencyMap = new Map();
      for (const obj of arrayTwo) {
        frequencyMap.set(obj.donor, (frequencyMap.get(obj.donor) || 0) + 1);
      }
      let unmatchedCount = 0;
      for (const obj of arrayOne) {
        if (frequencyMap.has(obj.donor) && frequencyMap.get(obj.donor) > 0) {
          // Cancel one occurrence
          frequencyMap.set(obj.donor, frequencyMap.get(obj.donor) - 1);
        } else {
          unmatchedCount++;
        }
      }

      return unmatchedCount;
  }

  const formatRelativeTime = (timestamp: number) => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - timestamp;
    
    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;
  
    if (diff < minute) return 'just now';
    if (diff < hour) return `${Math.floor(diff / minute)} minute${Math.floor(diff / minute) > 1 ? 's' : ''} ago`;
    if (diff < day) return `${Math.floor(diff / hour)} hour${Math.floor(diff / hour) > 1 ? 's' : ''} ago`;
    if (diff < week) return `${Math.floor(diff / day)} day${Math.floor(diff / day) > 1 ? 's' : ''} ago`;
    if (diff < month) return `${Math.floor(diff / week)} week${Math.floor(diff / week) > 1 ? 's' : ''} ago`;
    if (diff < year) return `${Math.floor(diff / month)} month${Math.floor(diff / month) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diff / year)} year${Math.floor(diff / year) > 1 ? 's' : ''} ago`;
  };
  
  // Utility function to trim Ethereum address
  function trimAddress(address: string){
    return  `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  function canWithdrawDonation(arrayOne: Donor[] = [], arrayTwo: DonorRecall[] = [], address: string = "") {
    const donationCount = arrayOne.reduce((acc, val) => (val.donor === address ? acc + 1 : acc), 0);
    const withdrawalCount = arrayTwo.reduce((acc, val) => (val.donor === address ? acc + 1 : acc), 0);
    if ( donationCount > withdrawalCount ){
      return true;
    }
    return false;
  }
   
  
  export { clipTextToWords, getDaysBetweenEpochAndCurrent, isPdf, 
    countUniqueDonors, formatRelativeTime, trimAddress, canWithdrawDonation}