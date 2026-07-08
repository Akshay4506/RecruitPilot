import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[400px] gap-4 p-8 text-center">
      <div className="h-12 w-12 rounded-full bg-[hsl(var(--muted)/0.3)] flex items-center justify-center mb-4">
        <FileQuestion className="h-6 w-6 text-[hsl(var(--muted-foreground))]" />
      </div>
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-[hsl(var(--muted-foreground))] max-w-md">
        The recruiter resource you are looking for does not exist or has been moved.
      </p>
      <Button asChild className="mt-4">
        <Link href="/recruiter/dashboard">
          Return to Dashboard
        </Link>
      </Button>
    </div>
  );
}
