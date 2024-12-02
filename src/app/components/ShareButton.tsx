"use client";
import React from 'react';



const ShareButton = ({ title, url }: {title: string, url: string}) => {
  const handleShare = () => {
    const text = encodeURIComponent(`Check out this amazing project: ${title}`);
    const shareUrl = encodeURIComponent(url);
    const hashtags = encodeURIComponent("Crowdfunding,Rootstock");

    const twitterLink = `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}&hashtags=${hashtags}`;
    window.open(twitterLink, '_blank');
  };

  return (
    <button
      onClick={handleShare}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Share on Twitter
    </button>
  );
};

export default ShareButton;