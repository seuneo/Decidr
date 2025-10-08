import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Home, Users, LogIn, ThumbsUp, ThumbsDown } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface JoinRoomProps {
  onJoinRoom: (roomCode: string) => void;
  onGoHome: () => void;
}

export function JoinRoom({ onJoinRoom, onGoHome }: JoinRoomProps) {
  const [roomCode, setRoomCode] = useState('');

  const handleJoinRoom = () => {
    if (roomCode.trim().length >= 4) {
      onJoinRoom(roomCode.trim().toUpperCase());
    } else {
      toast.error('Please enter a valid room code');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && roomCode.trim().length >= 4) {
      handleJoinRoom();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
    setRoomCode(value);
  };

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
        <h1 className="ml-2 font-semibold">Join a Vote</h1>
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
            <h2 className="text-2xl md:text-3xl font-bold text-black tracking-tight">Join a Vote</h2>
            <p className="text-slate-600 text-sm md:text-base max-w-md mx-auto">
              Enter the room code to participate in the voting
            </p>
          </div>

          {/* Input and button */}
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                id="roomCode"
                aria-label="Enter room code to join vote"
                placeholder="Enter 6-digit code"
                value={roomCode}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="text-sm md:text-base p-3 md:p-4 border-2 focus:outline-none focus:ring-2 focus:ring-[#E07A5F]/30 transition-colors bg-white h-12 md:h-14 rounded-2xl text-center text-lg md:text-xl font-bold tracking-wider"
                style={{borderColor: '#3D405B'}}
                maxLength={6}
              />
            </div>
            
            <Button 
              onClick={handleJoinRoom}
              disabled={roomCode.length < 4}
              aria-label="Join vote room with entered code"
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
              <LogIn className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Join
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}