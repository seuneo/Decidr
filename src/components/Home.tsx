import { Button } from './ui/button';
import { Card } from './ui/card';
import { Users, Plus, ThumbsUp, ThumbsDown } from 'lucide-react';

interface HomeProps {
  onCreateRoom: () => void;
  onJoinRoom: () => void;
}

export function Home({ onCreateRoom, onJoinRoom }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto shadow-lg" style={{backgroundColor: '#E07A5F'}}>
              <div className="flex items-center space-x-1">
                <ThumbsUp className="h-6 w-6 transform -rotate-12" style={{color: '#F4F1DE'}} />
                <ThumbsDown className="h-6 w-6 transform rotate-12" style={{color: '#F4F1DE'}} />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-5xl font-bold text-black tracking-tight">
                Decidr
              </h1>
              <p className="text-slate-600 text-xl max-w-lg mx-auto font-medium">
                Skip the debate. Decide together.
              </p>
            </div>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="space-y-4 pt-4">
          <Button
            onClick={onCreateRoom}
            className="w-full border-2 py-6 text-lg font-bold rounded-2xl transition-all duration-300 uppercase tracking-wide hover:scale-105 hover:shadow-lg cursor-pointer"
            style={{
              backgroundColor: '#E07A5F',
              borderColor: '#3D405B',
              color: '#F4F1DE',
              boxShadow: '0 4px 0 #3D405B'
            }}
            size="lg"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
          >
            <Plus className="h-6 w-6 mr-3" />
            Start a Vote
          </Button>

          <Button
            onClick={onJoinRoom}
            variant="outline"
            className="w-full border-2 py-6 text-lg font-bold rounded-2xl transition-all duration-300 uppercase tracking-wide hover:scale-105 hover:shadow-lg cursor-pointer"
            style={{
              backgroundColor: '#F4F1DE',
              borderColor: '#3D405B', 
              color: '#3D405B',
              boxShadow: '0 4px 0 #3D405B'
            }}
            size="lg"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F4F1DE';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
          >
            <Users className="h-6 w-6 mr-3" />
            Join a Vote
          </Button>
        </div>

      </div>
    </div>
  );
}