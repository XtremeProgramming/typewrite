import { ReactNode } from 'react';

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-full',
};

interface CardContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export function CardContainer({ children, size = 'md' }: CardContainerProps) {
  return (
    <div
      className={`w-full ${sizeClasses[size]} max-h-[calc(100vh-120px)] overflow-y-auto`}
    >
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}
