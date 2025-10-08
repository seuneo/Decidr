import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Home, Users, Clock, Wifi } from 'lucide-react';
import type { Room } from '../App';

interface WaitingRoomProps {
  room: Room;
  onGoHome: () => void;
}

export function WaitingRoom({ room, onGoHome }: WaitingRoomProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#F4F1DE'}}>
      {/* Header */}
      <div className="flex items-center justify-between p-4" style={{backgroundColor: '#F4F1DE'}}>
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onGoHome}
            style={{
              backgroundColor: 'transparent',
              color: 'inherit'
            }}
            className="transition-colors duration-200 cursor-pointer"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E8E0C7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Home className="h-4 w-4" />
          </Button>
          <h1 className="ml-2 font-semibold">Waiting Room</h1>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{room.participants} joined</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full space-y-4">
          {/* Question Display */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-black leading-relaxed">{room.question}</h2>
          </div>

          {/* Status Indicator */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-lg" style={{backgroundColor: '#E07A5F'}}>
              <Clock className="h-8 w-8" style={{color: '#F4F1DE'}} />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-black">Waiting for Host</h3>
              <p className="text-slate-600 text-sm">
                The vote will start when the host begins.
              </p>
            </div>
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center space-x-2">
            <div 
              className="rounded-full" 
              style={{ 
                width: '8px',
                height: '8px',
                backgroundColor: '#3D405B',
                animationDelay: '0ms',
                animation: 'bounce 1s infinite'
              }}
            ></div>
            <div 
              className="rounded-full" 
              style={{ 
                width: '8px',
                height: '8px',
                backgroundColor: '#3D405B',
                animationDelay: '150ms',
                animation: 'bounce 1s infinite'
              }}
            ></div>
            <div 
              className="rounded-full" 
              style={{ 
                width: '8px',
                height: '8px',
                backgroundColor: '#3D405B',
                animationDelay: '300ms',
                animation: 'bounce 1s infinite'
              }}
            ></div>
          </div>

        </div>
      </div>
    </div>
  );
}