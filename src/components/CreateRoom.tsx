import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Home, Users, Copy, Play, QrCode, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner';
import type { Room } from '../App';

interface CreateRoomProps {
  room?: Room;
  onCreateRoom?: (question: string) => void;
  onStartVoting?: () => void;
  onGoHome: () => void;
}

export function CreateRoom({ room, onCreateRoom, onStartVoting, onGoHome }: CreateRoomProps) {
  const [question, setQuestion] = useState('');

  const handleCreateRoom = () => {
    if (question.trim() && onCreateRoom) {
      onCreateRoom(question.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && question.trim()) {
      handleCreateRoom();
    }
  };

  const copyRoomCode = () => {
    if (room) {
      navigator.clipboard.writeText(room.id);
      toast.success('Room code copied to clipboard!');
    }
  };

  const copyRoomLink = () => {
    if (room) {
      // In a real app, this would be the full URL to join the room
      const roomLink = `${window.location.origin}/join/${room.id}`;
      navigator.clipboard.writeText(roomLink);
      toast.success('Room link copied to clipboard!');
    }
  };

  if (!room) {
    // Question input phase
    return (
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center p-4" style={{backgroundColor: '#F4F1DE'}}>
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
          <h1 className="ml-2 font-semibold">Create New Vote</h1>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-lg w-full space-y-3 md:space-y-4">
            <div className="text-center space-y-2 md:space-y-3">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-lg" style={{backgroundColor: '#E07A5F'}}>
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="h-6 w-6 transform -rotate-12" style={{color: '#F4F1DE'}} />
                  <ThumbsDown className="h-6 w-6 transform rotate-12" style={{color: '#F4F1DE'}} />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight">What's your question?</h2>
              <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto">
                Enter a yes or no question. You'll be able to share it once created.
              </p>
            </div>

            {/* Input and button */}
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Input
                  id="question"
                  aria-label="Enter your voting question"
                  placeholder="e.g., Should we order pizza for lunch?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyPress={handleKeyPress}
                    className="text-sm md:text-base pl-4 pr-3 py-3 md:pl-5 md:pr-4 md:py-4 border-2 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/30 transition-colors bg-white h-12 md:h-14 rounded-2xl"
                  style={{borderColor: '#3D405B'}}
                />
              </div>
              
              <Button 
                onClick={handleCreateRoom}
                disabled={!question.trim()}
                aria-label="Create vote room with entered question"
                className="border-2 py-4 md:py-6 px-4 md:px-6 text-sm md:text-lg font-bold rounded-2xl transition-all duration-300 uppercase tracking-wide disabled:bg-[#E07A5F]/30 disabled:cursor-not-allowed focus:ring-2 focus:ring-[#E07A5F]/30 focus:outline-none cursor-pointer"
                style={{
                  backgroundColor: '#E07A5F',
                  borderColor: '#3D405B',
                  color: '#F4F1DE',
                  boxShadow: '0 4px 0 #3D405B'
                }}
                size="lg"
                onMouseDown={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }
                }}
                onMouseUp={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Room created - show sharing options
  return (
    <div className="min-h-screen flex flex-col">
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
            <h1 className="ml-2 font-semibold">Vote Ready</h1>
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

            {/* Share Instructions */}
            <div className="text-center">
              <p className="text-sm text-slate-600">Share QR or room code to join vote</p>
            </div>

            {/* QR Code Placeholder */}
            <div className="text-center space-y-3">
              <img 
                src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://voteit.app/join/ABC123" 
                alt={`QR code containing room join link: ${room.id}`}
                className="w-48 h-48 mx-auto rounded-lg"
              />
            </div>

            {/* Room Code - Fixed width container */}
            <div className="max-w-md mx-auto space-y-4">
              <div className="text-center">
                <div 
                  className="text-sm font-medium tracking-wider bg-white border-2 rounded-lg py-2 text-slate-800"
                  style={{borderColor: '#3D405B'}}
                >
                  {room.id}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyRoomCode}
                  className="border-2 cursor-pointer transition-all duration-300"
                  style={{borderColor: '#3D405B', color: '#3D405B', backgroundColor: '#F4F1DE'}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E8E0C7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F4F1DE';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Code
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={copyRoomLink}
                  className="border-2 cursor-pointer transition-all duration-300"
                  style={{borderColor: '#3D405B', color: '#3D405B', backgroundColor: '#F4F1DE'}}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E8E0C7';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#F4F1DE';
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy Link
                </Button>
              </div>
            </div>

            {/* Start Button - Fixed width container */}
            <div className="max-w-md mx-auto">
              <Button 
                onClick={onStartVoting}
                className="w-full border-2 py-6 text-lg font-bold rounded-2xl transition-all duration-300 uppercase tracking-wide disabled:bg-[#E07A5F]/30 disabled:cursor-not-allowed cursor-pointer hover:scale-105 hover:shadow-lg"
                style={{
                  backgroundColor: '#E07A5F',
                  borderColor: '#3D405B',
                  color: '#F4F1DE',
                  boxShadow: '0 4px 0 #3D405B'
                }}
                size="lg"
                disabled={room.participants < 1}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.transform = 'scale(1)';
                  }
                }}
                onMouseDown={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }
                }}
                onMouseUp={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }
                }}
              >
                <Play className="h-5 w-5 mr-2" />
                Start Voting
              </Button>
            </div>
          </div>
      </div>
    </div>
  );
}