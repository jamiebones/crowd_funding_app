"use client";
import React from 'react';
import {  CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge'


interface StatusVariant {
  icon: JSX.Element;
  variant: 'default' | 'outline' | 'secondary';
}

interface MilestoneStatusBadgeProps {
  status: 'Approved' | 'Pending' | 'Rejected' | string; // Add string to handle unknown statuses
}

const MilestoneStatusBadge: React.FC<MilestoneStatusBadgeProps> = ({ status }) => {
  const statusVariants: Record<string, StatusVariant> = {
    Approved: {
      icon: <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />,
      variant: 'default',
    },
    Pending: {
      icon: <AlertCircle className="h-4 w-4 mr-1 text-yellow-500" />,
      variant: 'outline',
    },
    Rejected: {
      icon: <AlertCircle className="h-4 w-4 mr-1 text-blue-500" />,
      variant: 'secondary',
    },
  };

  const { icon, variant } = statusVariants[status] || {
    icon: <AlertCircle className="h-4 w-4 mr-1 text-gray-500" />,
    variant: 'outline',
  };

  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      {status}
    </Badge>
  );
};

export default MilestoneStatusBadge;