import { ReactNode } from 'react';
import { Link } from 'react-router';

interface BackLinkProps {
  to: string;
  prefixText?: string;
  children: ReactNode;
}

export function BackLink({ to, prefixText, children }: BackLinkProps) {
  return (
    <p className="mt-4 text-center text-sm">
      {prefixText && `${prefixText} `}
      <Link to={to} className="underline underline-offset-4">
        {children}
      </Link>
    </p>
  );
}
