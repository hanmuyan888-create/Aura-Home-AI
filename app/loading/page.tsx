import { Suspense } from 'react';
import LoadingContent from './LoadingContent';

export const dynamic = 'force-dynamic';

export default function LoadingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoadingContent />
    </Suspense>
  );
}