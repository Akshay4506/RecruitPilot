export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full min-h-[400px]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[hsl(var(--primary))]"></div>
    </div>
  );
}
