import * as React from "react";
import { Application, RecruiterNote } from "../../types";
import { Card } from "@/components/cards/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/utils";
import { Send, Lock, Globe, Users, AtSign, MessageCircle } from "lucide-react";

export function RecruiterNotes({ application }: { application: Application }) {
  const { notes } = application;

  const [newNote, setNewNote] = React.useState("");

  const NoteItem = ({ note, isReply = false }: { note: RecruiterNote, isReply?: boolean }) => (
    <div className={`flex gap-4 ${isReply ? 'mt-4 ml-12' : 'mt-6 pt-6 border-t border-[hsl(var(--border))] first:mt-0 first:pt-0 first:border-0'}`}>
      <Avatar src={note.author.avatarUrl} name={note.author.name} size={isReply ? "sm" : "md"} className="mt-1" />
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
        {!isReply && (
          <div className="flex items-center gap-4 pt-1">
            <button className="text-xs font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors flex items-center gap-1">
              <MessageCircle className="h-3 w-3" /> Reply
            </button>
          </div>
        )}
        
        {note.replies && note.replies.map(reply => (
          <NoteItem key={reply.id} note={reply} isReply />
        ))}
      </div>
    </div>
  );

  return (
    <Card className="flex flex-col h-[600px] border border-[hsl(var(--border))]">
      <div className="p-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)]">
        <h3 className="font-semibold text-[hsl(var(--foreground))]">Internal Notes & Collaboration</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
        {notes.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-[hsl(var(--muted-foreground))]">
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
            placeholder="Write a note... Type @ to mention someone" 
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
