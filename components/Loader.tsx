interface LoaderProps {
  className?: string;
}

export default function Loader({ className = "min-h-[400px]" }: LoaderProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
}