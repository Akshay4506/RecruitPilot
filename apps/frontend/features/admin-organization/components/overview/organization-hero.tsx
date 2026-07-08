import * as React from "react";
import { Button } from "@/components/ui/button";
import { Upload, Plus } from "lucide-react";
import { Organization, CompanyBranding } from "../../types";
import { Badge } from "@/components/ui/badge";

interface OrganizationHeroProps {
  organization: Organization;
  branding: CompanyBranding;
}

export function OrganizationHero({ organization, branding }: OrganizationHeroProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-[hsl(var(--border))]">
      <div className="flex items-center gap-4">
        <div 
          className="h-16 w-16 rounded-xl flex items-center justify-center text-xl font-bold shadow-sm"
          style={{ 
            backgroundColor: branding.primaryColor,
            color: "#ffffff"
          }}
        >
          {organization.name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight text-[hsl(var(--foreground))]">{organization.name}</h1>
            <Badge variant="outline" className="bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border-[hsl(var(--primary)/0.2)]">
              {organization.tier}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] mt-1">
            <span>{organization.industry}</span>
            <span>•</span>
            <span>{organization.domain}</span>
            <span>•</span>
            <span>{organization.companySize} employees</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <Button variant="outline" className="gap-2 flex-1 md:flex-none">
          <Upload className="h-4 w-4" />
          <span className="hidden sm:inline">Update Logo</span>
        </Button>
        <Button className="gap-2 flex-1 md:flex-none">
          <Plus className="h-4 w-4" />
          Add Office
        </Button>
      </div>
    </div>
  );
}
