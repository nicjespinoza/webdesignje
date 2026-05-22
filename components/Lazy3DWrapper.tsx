'use client';

import React, { Suspense, lazy } from 'react';

export const LazyScene3D = lazy(() => import('./Scene3D'));

export function LazyScene3DWrapper({ 
  className = '',
  fallback = null 
}: { 
  className?: string;
  fallback?: React.ReactNode;
}) {
  return (
    <Suspense fallback={fallback || <Loading3DPlaceholder className={className} />}>
      <LazyScene3D />
    </Suspense>
  );
}

function Loading3DPlaceholder({ className }: { className?: string }) {
  return (
    <div className={`bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl animate-pulse ${className || ''}`}>
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-slate-500 text-sm font-mono">Loading 3D...</div>
      </div>
    </div>
  );
}

