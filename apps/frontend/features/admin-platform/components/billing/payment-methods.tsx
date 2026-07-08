import * as React from "react";
import { SettingsSection } from "@/features/admin-settings/components/settings-section";
import { PaymentMethod } from "../../types";
import { Button } from "@/components/ui/button";
import { CreditCard, Landmark, Plus, Trash2, CheckCircle2 } from "lucide-react";

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
}

export function PaymentMethods({ paymentMethods }: PaymentMethodsProps) {
  return (
    <SettingsSection 
      title="Payment Methods" 
      description="Manage credit cards and bank accounts used for subscription billing."
      footer={
        <div className="flex justify-end gap-2 w-full">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Payment Method
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className={`flex items-center justify-between p-4 border rounded-lg ${method.isDefault ? "border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.05)]" : "border-[hsl(var(--border))] bg-[hsl(var(--card))]"}`}>
            
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-[hsl(var(--muted))] flex items-center justify-center">
                {method.type === "CARD" ? <CreditCard className="h-5 w-5 text-[hsl(var(--muted-foreground))]" /> : <Landmark className="h-5 w-5 text-[hsl(var(--muted-foreground))]" />}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-[hsl(var(--foreground))]">
                    {method.type === "CARD" ? `${method.brand} ending in ${method.last4}` : "Bank Transfer"}
                  </span>
                  {method.isDefault && (
                    <span className="flex items-center text-xs font-medium text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Default
                    </span>
                  )}
                </div>
                {method.type === "CARD" && (
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">Expires {method.expMonth}/{method.expYear}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!method.isDefault && (
                <Button variant="ghost" size="sm" className="text-xs">Set Default</Button>
              )}
              <Button variant="ghost" size="icon" className="text-[hsl(var(--destructive))] hover:text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive)/0.1)]">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

          </div>
        ))}
      </div>
    </SettingsSection>
  );
}
