import { SectionLoader } from "@/components/loaders/spinner";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SectionLoader message="Loading..." />
    </div>
  );
}
