import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Home, ThumbsUp, ThumbsDown, Users, StopCircle, CheckCircle, Clock } from 'lucide-react';
import type { Room, UserRole } from '../App';

interface VotingRoomProps {
  room: Room;
  userRole: UserRole;
  userVote: 'up' | 'down' | null;
  onVote: (vote: 'up' | 'down') => void;
  onEndPoll: () => void;
  onGoHome: () => void;
}

export function VotingRoom({ room, userRole, userVote, onVote, onEndPoll, onGoHome }: VotingRoomProps) {
  const [isVoting, setIsVoting] = useState(false);
  const totalVotes = room.votes.up + room.votes.down;
  const remainingParticipants = Math.max(0, room.participants - totalVotes);

  const handleVote = async (vote: 'up' | 'down') => {
    if (isVoting) return;
    
    setIsVoting(true);
    
    // Simulate vote processing
    setTimeout(() => {
      onVote(vote);
      setIsVoting(false);
    }, 500);
  };

  return (
    <>
      <style>{`
        .vote-button {
          box-shadow: 0 4px 0 #3D405B !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .vote-button:hover {
          transform: scale(1.02) !important;
          box-shadow: 0 5px 0 #3D405B, 0 8px 20px rgba(0,0,0,0.08) !important;
        }
        .vote-button:active {
          transform: scale(0.98) !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .end-vote-button {
          box-shadow: 0 4px 0 #3D405B !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .end-vote-button:hover:not(:disabled) {
          transform: scale(1.02) !important;
          box-shadow: 0 5px 0 #3D405B, 0 8px 20px rgba(0,0,0,0.08) !important;
        }
        .end-vote-button:active:not(:disabled) {
          transform: scale(0.98) !important;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
      `}</style>
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
          <h1 className="ml-2 font-semibold">
            Vote
          </h1>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{room.participants} joined</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full space-y-4">
          {/* Question */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-black leading-relaxed">{room.question}</h2>
          </div>

          {/* Vote Status */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>{totalVotes} voted</span>
              </div>
            </div>
          </div>

          {/* Vote Status or Voting Buttons */}
          {userVote ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto shadow-lg" style={{backgroundColor: '#E07A5F'}}>
                <CheckCircle className="h-8 w-8" style={{color: '#F4F1DE'}} />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-black">Vote Confirmed!</h3>
                <p className="text-slate-600">
                  You voted{' '}
                  <span 
                    className="font-semibold"
                    style={{color: userVote === 'up' ? '#10B981' : '#EF4444'}}
                  >
                    {userVote === 'up' ? 'YES' : 'NO'}
                  </span>
                </p>
                <div className="text-sm text-slate-500">
                  Waiting for results...
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center text-slate-600 text-sm">
                Cast your vote:
              </div>
              
              <div className="max-w-md mx-auto">
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    onClick={() => handleVote('up')}
                    disabled={isVoting}
                    className="vote-button flex-col space-y-3 border-2 rounded-2xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: '#10B981',
                      borderColor: '#3D405B',
                      color: '#F4F1DE',
                      height: '180px'
                    }}
                    size="lg"
                  >
                    <ThumbsUp className="h-12 w-12" />
                    <span className="text-lg font-bold">YES</span>
                  </Button>
                  
                  <Button
                    onClick={() => handleVote('down')}
                    disabled={isVoting}
                    className="vote-button flex-col space-y-3 border-2 rounded-2xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: '#EF4444',
                      borderColor: '#3D405B',
                      color: '#F4F1DE',
                      height: '180px'
                    }}
                    size="lg"
                  >
                    <ThumbsDown className="h-12 w-12" />
                    <span className="text-lg font-bold">NO</span>
                  </Button>
                </div>
              </div>
            </div>
          )}


          {/* Host Controls */}
          {userRole === 'host' && (
            <div className="max-w-md mx-auto">
              <Button
                onClick={onEndPoll}
                disabled={totalVotes === 0}
                className="end-vote-button w-full border-2 py-6 text-lg font-bold rounded-2xl transition-all duration-300 uppercase tracking-wide disabled:bg-[#E07A5F]/30 disabled:cursor-not-allowed cursor-pointer mb-4"
                style={{
                  backgroundColor: totalVotes === 0 ? '#E07A5F' : '#E07A5F',
                  borderColor: '#3D405B',
                  color: '#F4F1DE'
                }}
                size="lg"
                title={totalVotes === 0 ? "At least one vote required to end" : "End the vote and show results"}
              >
                <StopCircle className="h-5 w-5 mr-2" />
                End Vote
              </Button>
              {totalVotes === 0 && (
                <p className="text-center text-sm text-slate-600">
                  At least one vote required to end
                </p>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
    </>
  );
}