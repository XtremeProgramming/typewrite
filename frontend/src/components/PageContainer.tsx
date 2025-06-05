import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full items-center justify-center p-6 md:p-10">
      {children}
    </div>
  );
}
