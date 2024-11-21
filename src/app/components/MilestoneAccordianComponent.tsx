"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from 'lucide-react';
import MilestoneStatusBadge from "./MilestoneStatusBadge";
import Milestone from "../interfaces/Milestone";


const MilestonesAccordion = ({ milestones, currentMilestone }: { milestones: Milestone[], currentMilestone: string }) => {
    const [openMilestone, setOpenMilestone] = useState<string | null>(null);
    const filteredMilestone:Milestone[] = milestones.filter((milestone ) => {
        return milestone.id === currentMilestone
    });
  
    const toggleMilestone = (milestoneId: string) => {
      setOpenMilestone(openMilestone === milestoneId ? null : milestoneId);
    };
  
    return (
      <div className="space-y-2 mt-4 border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Project Milestones</h4>
        {filteredMilestone.map((milestone) => (
          <div 
            key={milestone.id} 
            className="border rounded-lg overflow-hidden"
          >
            <div 
              className="flex justify-between items-center p-3 cursor-pointer hover:bg-gray-50"
              onClick={() => toggleMilestone(milestone.id)}
            >
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">{milestone?.content?.title || "Milestone Capone Project Summary"}</span>
                <MilestoneStatusBadge status={milestone.milestonestatus} />
              </div>
              {openMilestone === milestone.id ? <ChevronUp /> : <ChevronDown />}
            </div>
            
            {openMilestone === milestone.id && (
              <div className="p-3 bg-gray-50 text-sm">
                <p className="mb-2">{milestone?.content?.title || "Mile stone details"}</p>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>
                    <strong>Details:</strong> {milestone.details}
                  </div>
                  <div>
                    <strong>Period to Vote:</strong> {milestone.periodToVote}
                  </div>
                  <div>
                    <strong>Date Created:</strong> {milestone.dateCreated}
                  </div>
                  <div>
                    <strong>Milestone CID:</strong> {milestone.milestoneCID}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  export default MilestonesAccordion;