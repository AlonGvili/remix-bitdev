export default function ScopeCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`aspect-video border border-gray-200 rounded-lg hover:shadow-md hover:shadow-violet-200 p-4`}
    >
      {children}
    </div>
  );
}
