// components/ui/ErrorMessage.tsx
export default function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
      <svg
        viewBox="0 0 24 24"
        className="w-3 h-3 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71
          c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898
          0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
        />
      </svg>
      {message}
    </p>
  );
}
