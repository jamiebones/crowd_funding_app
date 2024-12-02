import React from 'react';
import { Button } from "@/components/ui/button";
import { Twitter } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ShareButton = ({ title, url }: {title: string, url: string}) => {
  const handleShare = () => {
    const text = encodeURIComponent(`Check out this amazing project: ${title}`);
    const shareUrl = encodeURIComponent(url);
    const hashtags = encodeURIComponent("CrowdfundingContract,Rootstock");

    const twitterLink = `https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}&hashtags=${hashtags}`;
    window.open(twitterLink, '_blank');
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            size="icon"
            color='primary'
            onClick={handleShare}
          >
            <Twitter className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Share on Twitter</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ShareButton;