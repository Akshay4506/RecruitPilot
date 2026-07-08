import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/cards/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit3, Code, ExternalLink, Calendar as CalendarIcon, FileText } from "lucide-react";
import { Project } from "../../types";
import { formatDate } from "@/lib/utils";

interface ProjectPortfolioProps {
  projects: Project[];
  onAdd?: () => void;
  onEdit?: (id: string) => void;
}

export function ProjectPortfolio({ projects, onAdd, onEdit }: ProjectPortfolioProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <Card className="border-[hsl(var(--border))] shadow-sm bg-[hsl(var(--card))]">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold text-[hsl(var(--foreground))]">Projects</CardTitle>
        <Button variant="ghost" size="icon-sm" onClick={onAdd} aria-label="Add Project">
          <Plus className="h-4 w-4 text-[hsl(var(--muted-foreground))]" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="border border-[hsl(var(--border))] bg-[hsl(var(--background))] flex flex-col h-full shadow-none overflow-hidden hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3 flex flex-row items-start justify-between gap-2">
                <div className="space-y-1 pr-2">
                  <h3 className="font-semibold text-base text-[hsl(var(--foreground))] leading-tight">
                    {project.title}
                  </h3>
                  <div className="text-sm font-medium text-[hsl(var(--primary))]">
                    {project.role}
                  </div>
                </div>
                {onEdit && (
                  <Button variant="ghost" size="icon-xs" onClick={() => onEdit(project.id)} className="shrink-0 -mt-1 -mr-2" aria-label="Edit project">
                    <Edit3 className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))]" />
                  </Button>
                )}
              </CardHeader>
              <CardContent className="flex-1 pb-4 flex flex-col">
                <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))] mb-3">
                  <CalendarIcon className="h-3.5 w-3.5" />
                  <time dateTime={project.startDate}>{formatDate(project.startDate, { month: "short", year: "numeric" })}</time>
                  <span>-</span>
                  {project.isCurrent ? (
                    <span className="text-[hsl(var(--primary))] font-medium">Present</span>
                  ) : (
                    <time dateTime={project.endDate || ""}>{project.endDate ? formatDate(project.endDate, { month: "short", year: "numeric" }) : ""}</time>
                  )}
                </div>
                
                <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-3 mb-4 flex-1">
                  {project.description}
                </p>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.technologies.map(tech => (
                      <Badge key={tech} variant="neutral" size="sm" className="font-medium rounded text-xs bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted)/0.8)]">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              {(project.githubUrl || project.liveUrl || (project.documents && project.documents.length > 0)) && (
                <CardFooter className="pt-3 pb-3 border-t border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.2)] flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium flex items-center gap-1.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                      <Code className="h-3.5 w-3.5" /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-medium flex items-center gap-1.5 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                      <ExternalLink className="h-3.5 w-3.5" /> Live Demo
                    </a>
                  )}
                  {project.documents && project.documents.length > 0 && (
                    <div className="text-xs font-medium flex items-center gap-1.5 text-[hsl(var(--muted-foreground))] ml-auto">
                      <FileText className="h-3.5 w-3.5" /> {project.documents.length} Docs
                    </div>
                  )}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectPortfolioSkeleton() {
  return (
    <Card className="border-[hsl(var(--border))] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <div className="h-6 w-24 bg-[hsl(var(--muted))] animate-pulse rounded" />
        <div className="h-8 w-8 bg-[hsl(var(--muted))] animate-pulse rounded-md" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Card key={i} className="border border-[hsl(var(--border))] shadow-none h-48 flex flex-col">
              <CardHeader className="pb-3">
                <div className="h-5 w-3/4 bg-[hsl(var(--muted))] animate-pulse rounded mb-1" />
                <div className="h-4 w-1/2 bg-[hsl(var(--muted))] animate-pulse rounded" />
              </CardHeader>
              <CardContent className="flex-1 space-y-2">
                <div className="h-3 w-32 bg-[hsl(var(--muted))] animate-pulse rounded mb-3" />
                <div className="h-3 w-full bg-[hsl(var(--muted))] animate-pulse rounded" />
                <div className="h-3 w-[90%] bg-[hsl(var(--muted))] animate-pulse rounded" />
              </CardContent>
              <CardFooter className="pt-3 border-t border-[hsl(var(--border))]">
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-[hsl(var(--muted))] animate-pulse rounded" />
                  <div className="h-6 w-16 bg-[hsl(var(--muted))] animate-pulse rounded" />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
