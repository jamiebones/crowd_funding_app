"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import Milestone from '../interfaces/Milestone';
import { formatRelativeTime, getDaysBetweenEpochAndCurrent } from '@/utils/utility';


const MilestoneDisplayComponent = ({ milestones = [] }: {milestones: Milestone[]}) => {
    // Status color mapping
    const getStatusColor = (status: string) => {
        switch(status.toLowerCase()) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'decline': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Render message if no milestones
    if (milestones.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                No milestones to display
            </div>
        );
    }

    return (
        <div className="space-y-6 w-full p-4">
            {milestones.map((milestone) => (
                <Card key={milestone.id} className="overflow-hidden shadow-lg">
                    <CardHeader className="bg-gray-50 p-4">
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-xl font-bold">
                                {milestone.content?.title || 'Untitled Milestone'}
                            </CardTitle>
                            <Badge className={`${getStatusColor(milestone.milestonestatus)} px-3 py-1`}>
                                {milestone.milestonestatus}
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Created: {formatRelativeTime(+milestone.dateCreated)}
                        </p>
                    </CardHeader>
                    <div className='p-4 flex flex-col md:flex-row gap-4'>
                    <CardContent className="">
                        {/* Media Carousel */}
                        {milestone.content?.media && milestone.content.media.length > 0 && (
                            <Carousel className="w-full max-w-md mx-auto md:w-1/2">
                                <CarouselContent>
                                    {milestone.content.media.map((mediaUrl, index) => (
                                        <CarouselItem key={index}>
                                            <img 
                                                src={`https://arweave.net/${mediaUrl.split(":")[0]}`} 
                                                alt={`Milestone media ${index + 1}`} 
                                                className="w-full h-64 object-cover rounded-lg"
                                            />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                {milestone.content.media.length > 1 && (
                                    <>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </>
                                )}
                            </Carousel>
                        )}

                        {/* Milestone Details */}
                        <div className="space-y-4 md:w-1/2">
                            <p className="text-gray-700">
                                {milestone.content?.details || 'No details available'}
                            </p>
                            
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <span className="font-semibold text-gray-600">Voting Period:</span>
                                    <span className="text-gray-800">
                                        {getDaysBetweenEpochAndCurrent(+milestone.periodToVote)} days left
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default MilestoneDisplayComponent;