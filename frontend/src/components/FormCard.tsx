import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ReactNode } from 'react';

interface FormCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  headerActions?: ReactNode;
}

export function FormCard({
  title,
  description,
  children,
  headerActions,
}: FormCardProps) {
  return (
    <Card>
      <CardHeader
        className={headerActions ? 'flex justify-between' : undefined}
      >
        <div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {headerActions}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
