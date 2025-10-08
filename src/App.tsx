import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { CreateRoom } from './components/CreateRoom';
import { JoinRoom } from './components/JoinRoom';
import { WaitingRoom } from './components/WaitingRoom';
import { VotingRoom } from './components/VotingRoom';
import { Results } from './components/Results';
import { Toaster } from './components/ui/sonner';

export type AppState = 'home' | 'create' | 'join' | 'waiting' | 'voting' | 'results';
export type UserRole = 'host' | 'participant';

export interface Room {
  id: string;
  question: string;
  participants: number;
  votes: {
    up: number;
    down: number;
  };
  isActive: boolean;
  hasVoted: boolean;
}

export default function App() {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [userRole, setUserRole] = useState<UserRole>('participant');
  const [room, setRoom] = useState<Room | null>(null);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);

  // Mock room creation
  const createRoom = (question: string) => {
    const newRoom: Room = {
      id: Math.random().toString(36).substr(2, 6).toUpperCase(),
      question,
      participants: 1,
      votes: { up: 0, down: 0 },
      isActive: false,
      hasVoted: false
    };
    setRoom(newRoom);
    setUserRole('host');
    setCurrentState('create');
  };

  // Mock room joining
  const joinRoom = (roomCode: string) => {
    // Simulate finding a room
    const mockRoom: Room = {
      id: roomCode,
      question: "Should we have pizza for lunch tomorrow?",
      participants: 3,
      votes: { up: 0, down: 0 },
      isActive: false, // Start in waiting state
      hasVoted: false
    };
    setRoom(mockRoom);
    setUserRole('participant');
    setCurrentState('waiting'); // Show waiting room first
    
    // Simulate participant count increase
    setTimeout(() => {
      setRoom(prev => prev ? { ...prev, participants: prev.participants + 1 } : null);
    }, 1000);

    // Auto-start voting after 3 seconds for testing
    setTimeout(() => {
      setRoom(prev => prev ? { ...prev, isActive: true } : null);
      setCurrentState('voting');
    }, 3000);
  };

  // Start voting
  const startVoting = () => {
    if (room) {
      setRoom({ ...room, isActive: true });
      setCurrentState('voting');
    }
  };

  // Cast vote
  const castVote = (vote: 'up' | 'down') => {
    if (room && !room.hasVoted) {
      setUserVote(vote);
      setRoom({
        ...room,
        votes: {
          ...room.votes,
          [vote]: room.votes[vote] + 1
        },
        hasVoted: true
      });
      
      // Auto-transition to results after 2 seconds for participants
      if (userRole === 'participant') {
        setTimeout(() => {
          setCurrentState('results');
        }, 2000);
      }
    }
  };

  // End poll (host only)
  const endPoll = () => {
    setCurrentState('results');
  };

  // Navigate back to home
  const goHome = () => {
    setCurrentState('home');
    setRoom(null);
    setUserRole('participant');
    setUserVote(null);
  };

  // Auto-simulate other participants voting for demo purposes
  useEffect(() => {
    if (currentState === 'voting' && room && userRole === 'host') {
      const interval = setInterval(() => {
        setRoom(prev => {
          if (!prev) return null;
          const randomVote = Math.random() > 0.6 ? 'up' : 'down';
          return {
            ...prev,
            votes: {
              ...prev.votes,
              [randomVote]: prev.votes[randomVote] + 1
            }
          };
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [currentState, userRole]);

  const renderCurrentScreen = () => {
    switch (currentState) {
      case 'home':
        return (
          <Home 
            onCreateRoom={() => setCurrentState('create')}
            onJoinRoom={() => setCurrentState('join')}
          />
        );
      case 'create':
        return room ? (
          <CreateRoom 
            room={room}
            onStartVoting={startVoting}
            onGoHome={goHome}
          />
        ) : (
          <CreateRoom 
            onCreateRoom={createRoom}
            onGoHome={goHome}
          />
        );
      case 'join':
        return (
          <JoinRoom 
            onJoinRoom={joinRoom}
            onGoHome={goHome}
          />
        );
      case 'waiting':
        return room ? (
          <WaitingRoom 
            room={room}
            onGoHome={goHome}
          />
        ) : null;
      case 'voting':
        return room ? (
          <VotingRoom 
            room={room}
            userRole={userRole}
            userVote={userVote}
            onVote={castVote}
            onEndPoll={endPoll}
            onGoHome={goHome}
          />
        ) : null;
      case 'results':
        return room ? (
          <Results 
            room={room}
            onGoHome={goHome}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#F4F1DE'}}>
      {renderCurrentScreen()}
      <Toaster />
    </div>
  );
}