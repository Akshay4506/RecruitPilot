import * as React from "react";
import { Card } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, Square, MessageSquare, Plus, ChevronRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function LiveInterviewMode() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [activeQuestion, setActiveQuestion] = React.useState(0);

  const questions = [
    { comp: "Data Structures", q: "How would you design a rate limiter?" },
    { comp: "Algorithms", q: "Implement a thread-safe cache." }
  ];

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => setSeconds(s => s + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="border-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary)/0.5)] shadow-lg bg-[hsl(var(--card))] overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="bg-[hsl(var(--primary)/0.05)] border-b border-[hsl(var(--primary)/0.2)] p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[hsl(var(--background))] border border-[hsl(var(--primary)/0.3)] px-3 py-1.5 rounded-full font-mono text-[hsl(var(--primary))] font-bold shadow-sm">
            {isRunning && <span className="h-2 w-2 rounded-full bg-[hsl(var(--destructive))] animate-pulse" />}
            {!isRunning && <span className="h-2 w-2 rounded-full bg-[hsl(var(--muted-foreground))]" />}
            {formatTime(seconds)}
          </div>
          <div className="text-sm font-semibold text-[hsl(var(--foreground))]">Execution Mode Active</div>
        </div>
        
        <div className="flex items-center gap-2">
          {!isRunning ? (
            <Button size="sm" variant="outline" className="gap-2 border-[hsl(var(--success)/0.5)] text-[hsl(var(--success))]" onClick={() => setIsRunning(true)}>
              <Play className="h-4 w-4" /> Start
            </Button>
          ) : (
            <Button size="sm" variant="outline" className="gap-2 border-[hsl(var(--warning)/0.5)] text-[hsl(var(--warning))]" onClick={() => setIsRunning(false)}>
              <Pause className="h-4 w-4" /> Pause
            </Button>
          )}
          <Button size="sm" variant="destructive" className="gap-2">
             <Square className="h-4 w-4" /> End Interview
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Left column: Questions */}
        <div className="w-1/3 border-r border-[hsl(var(--border))] flex flex-col bg-[hsl(var(--muted)/0.1)]">
          <div className="p-3 border-b border-[hsl(var(--border))] font-semibold text-sm text-[hsl(var(--foreground))] flex justify-between items-center">
            Agenda
            <Badge variant="outline" className="text-[10px] h-5 bg-[hsl(var(--background))]">{activeQuestion + 1} of {questions.length}</Badge>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {questions.map((q, i) => (
              <div 
                key={i} 
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${i === activeQuestion ? 'bg-[hsl(var(--primary)/0.1)] border-[hsl(var(--primary)/0.3)]' : 'bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:border-[hsl(var(--primary)/0.5)]'}`}
                onClick={() => setActiveQuestion(i)}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[10px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">{q.comp}</span>
                  {i < activeQuestion && <CheckCircle2 className="h-3 w-3 text-[hsl(var(--success))]" />}
                </div>
                <div className="text-sm font-medium text-[hsl(var(--foreground))] line-clamp-2">{q.q}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Active Question & Notes */}
        <div className="flex-1 flex flex-col p-6 overflow-y-auto">
          <Badge variant="neutral" className="w-fit mb-3">{questions[activeQuestion].comp}</Badge>
          <h2 className="text-xl font-bold text-[hsl(var(--foreground))] mb-6">{questions[activeQuestion].q}</h2>
          
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Interview Notes
              </h3>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[hsl(var(--muted-foreground))]">Quick Score:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(num => (
                    <button key={num} className="h-6 w-6 rounded border border-[hsl(var(--border))] hover:bg-[hsl(var(--primary)/0.1)] hover:border-[hsl(var(--primary)/0.3)] transition-colors flex items-center justify-center font-medium">
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <textarea 
              className="w-full h-48 rounded-lg border border-[hsl(var(--input))] bg-[hsl(var(--background))] p-3 text-sm placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
              placeholder="Take private notes during the interview..."
            />
            
            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" size="sm" className="gap-2">
                <Plus className="h-4 w-4" /> Add Follow-up
              </Button>
              <Button size="sm" className="gap-2" onClick={() => setActiveQuestion(Math.min(questions.length - 1, activeQuestion + 1))}>
                Next Question <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
