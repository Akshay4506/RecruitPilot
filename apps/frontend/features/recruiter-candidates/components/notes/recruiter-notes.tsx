import * as React from "react";
import { RecruiterCandidate, RecruiterNote } from "../../types";
import { Card } from "@/components/cards/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";
import { Send, Lock, Globe, Users, AtSign, MessageCircle, Pin } from "lucide-react";

export function RecruiterNotes({ candidate }: { candidate: RecruiterCandidate }) {
  const { notes } = candidate;
  const [newNote, setNewNote] = React.useState("");

  const NoteItem = ({ note }: { note: RecruiterNote }) => (
    <div className="mt-6 pt-6 border-t border-[hsl(var(--border))] first:mt-0 first:pt-0 first:border-0 relative">
      {note.pinned && (
        <div className="absolute -top-3 right-0 bg-[hsl(var(--warning)/0.1)] text-[hsl(var(--warning))] border border-[hsl(var(--warning)/0.2)] px-2 py-0.5 rounded-md text-[10px] font-medium flex items-center gap-1">
          <Pin className="h-3 w-3" /> Pinned
        </div>
      )}
      <div className="flex gap-4">
        <Avatar src={note.author.avatarUrl} name={note.author.name} size="md" className="mt-1" />
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <span className="font-medium text-[hsl(var(--foreground))] text-sm">{note.author.name}</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))] ml-2">{note.author.role} &bull; {formatRelativeTime(note.timestamp)}</span>
            </div>
            <Badge variant="outline" className="text-[10px] gap-1 h-5">
              {note.visibility === "PRIVATE" && <><Lock className="h-2.5 w-2.5" /> Private</>}
              {note.visibility === "SHARED" && <><Globe className="h-2.5 w-2.5" /> Shared</>}
              {note.visibility === "HIRING_MANAGER_ONLY" && <><Users className="h-2.5 w-2.5" /> HM Only</>}
            </Badge>
          </div>
          <p className="text-sm text-[hsl(var(--foreground))] whitespace-pre-wrap">{note.content}</p>
          <div className="flex items-center gap-4 pt-1">
            <button className="text-xs font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-1">
              <MessageCircle className="h-3 w-3" /> Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="flex flex-col min-h-[600px] border border-[hsl(var(--border))]">
      <div className="p-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)]">
        <h3 className="font-semibold text-[hsl(var(--foreground))]">Global Candidate Notes</h3>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">These notes are visible across all applications for this candidate.</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        {notes.length === 0 ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-[hsl(var(--muted-foreground))]">
            <MessageCircle className="h-10 w-10 mb-2 opacity-20" />
            <p>No notes added yet.</p>
          </div>
        ) : (
          <div>
            {notes.map(note => <NoteItem key={note.id} note={note} />)}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] space-y-3">
        <div className="relative">
          <Textarea 
            placeholder="Write a global note... Type @ to mention someone" 
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[80px] resize-none pr-10"
          />
          <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-6 w-6 text-[hsl(var(--muted-foreground))]">
            <AtSign className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-[hsl(var(--muted))] gap-1">
              <Lock className="h-3 w-3" /> Private
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-[hsl(var(--muted))] gap-1 border-[hsl(var(--primary))] text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.05)]">
              <Globe className="h-3 w-3" /> Shared
            </Badge>
          </div>
          <Button size="sm" className="gap-2" disabled={!newNote.trim()}>
            Post Note <Send className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
