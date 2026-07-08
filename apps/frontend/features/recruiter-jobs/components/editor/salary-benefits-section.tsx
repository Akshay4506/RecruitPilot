import * as React from "react";
import { Label } from "@/components/ui/primitives";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function SalaryBenefitsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-[hsl(var(--foreground))] mb-1">Salary & Benefits</h3>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">Compensation details and company perks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Minimum Salary</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-[hsl(var(--muted-foreground))]">$</span>
            <Input type="number" placeholder="100,000" className="pl-7" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Maximum Salary</Label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-[hsl(var(--muted-foreground))]">$</span>
            <Input type="number" placeholder="150,000" className="pl-7" />
          </div>
        </div>
        <div className="space-y-2">
          <Label>Currency</Label>
          <select className="flex h-10 w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm ring-offset-[hsl(var(--background))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]">
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label>Interval</Label>
          <select className="flex h-10 w-full rounded-md border border-[hsl(var(--input))] bg-transparent px-3 py-2 text-sm ring-offset-[hsl(var(--background))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]">
            <option>Yearly</option>
            <option>Monthly</option>
            <option>Hourly</option>
          </select>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-[hsl(var(--border))]">
        <Label>Benefits & Perks</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border border-[hsl(var(--border))] rounded-lg flex items-start gap-3 bg-[hsl(var(--card))]">
            <input type="checkbox" className="mt-1" defaultChecked />
            <div>
              <p className="text-sm font-medium">Health Insurance</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Full medical, dental, and vision coverage.</p>
            </div>
          </div>
          <div className="p-4 border border-[hsl(var(--border))] rounded-lg flex items-start gap-3 bg-[hsl(var(--card))]">
            <input type="checkbox" className="mt-1" defaultChecked />
            <div>
              <p className="text-sm font-medium">Remote Work Stipend</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">$1,000 to setup your home office.</p>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm"><Plus className="h-4 w-4 mr-2" /> Custom Benefit</Button>
      </div>
    </div>
  );
}
