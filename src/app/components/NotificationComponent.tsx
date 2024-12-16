import React, { useState, useEffect } from 'react';
import { 
  Alert, 
  AlertDescription, 
  AlertTitle 
} from '@/components/ui/alert';
import { 
  X, 
  Info 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InfoNotificationProps {
  message: string;
  description?: string;
}

const NotificationComponent: React.FC<InfoNotificationProps> = ({ 
  message, 
  description 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  // Only render if the notification is visible
  if (!isVisible) return null;

  return (
    <div className="w-full p-4">
      <Alert 
        className="
          border-2 
          border-blue-500 
          bg-white 
          shadow-lg 
          rounded-lg 
          animate-slide-in-right
        "
      >
        <div className="flex items-start">
          <Info className="text-blue-500 mr-3 mt-1" />
          <div className="flex-1">
            <AlertTitle className="font-bold">{message}</AlertTitle>
            {description && (
              <AlertDescription className="text-muted-foreground">
                {description}
              </AlertDescription>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleClose}
            className="hover:bg-transparent"
          >
            <X className="h-4 w-4 opacity-70 hover:opacity-100" />
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export default NotificationComponent;