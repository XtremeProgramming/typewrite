import { Link } from 'react-router';

interface BackLinkProps {
  to: string;
  prefixText?: string;
  linkText: string;
}

export function BackLink({ to, prefixText, linkText }: BackLinkProps) {
  return (
    <p className="mt-4 text-center text-sm">
      {prefixText && `${prefixText} `}
      <Link to={to} className="underline underline-offset-4">
        {linkText}
      </Link>
    </p>
  );
}
