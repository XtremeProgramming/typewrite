import { ReactNode } from 'react';

interface CardContainerProps {
  children: ReactNode;
}

export function CardContainer({ children }: CardContainerProps) {
  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col gap-6">{children}</div>
    </div>
  );
}
