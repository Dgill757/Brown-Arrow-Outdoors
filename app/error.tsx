'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
          <div className="bg-red-50 border border-red-200 rounded p-4 mb-4 max-w-lg overflow-auto">
            <p className="font-mono text-sm text-red-800">{error.message}</p>
            {error.digest && (
              <p className="font-mono text-xs text-red-600 mt-2">Digest: {error.digest}</p>
            )}
          </div>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
