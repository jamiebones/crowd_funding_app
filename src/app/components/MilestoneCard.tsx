"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Milestone from "../interfaces/Milestone";


interface MilestoneCardProps {
  milestone: Milestone;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone }) => (
  
  <Card className="overflow-hidden">
    {milestone?.content?.media && milestone.content.media.length > 0 && (
      <div className="grid grid-cols-2 gap-2 p-4">
        {milestone?.content?.media?.map((image, index) => (
          
          <img
            key={index}
            src={`https://arweave.net/${image.split(":")[0]}`}
            alt={`${milestone?.content?.title} - Image ${index + 1}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        ))}
      </div>
    )}
    <CardContent className="p-4">
      <h3 className="font-semibold text-lg mb-2">
        {milestone?.content?.title}
      </h3>
      <p className="text-muted-foreground mb-2">
        {milestone?.content?.details}
      </p>

      <p className="text-muted-foreground mb-2">
        <Badge variant="secondary">{milestone?.milestonestatus}</Badge>
      </p>

      <div className="flex items-center text-sm text-muted-foreground">
        <Calendar className="w-4 h-4 mr-2" />
        {new Date(+milestone.dateCreated * 1000).toDateString()}
      </div>
    </CardContent>
  </Card>
);

export default MilestoneCard;
