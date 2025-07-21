import {
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNav,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const shouldShowCurrentPage = currentPage > 1 && currentPage < totalPages;
  const shouldShowPreviousPage = currentPage > 2;
  const shouldShowNextPage = currentPage < totalPages - 1;
  const shouldShowPaginationEllipsisStart = currentPage > 3;
  const shouldShowPaginationEllipsisEnd = currentPage < totalPages - 2;

  return (
    <PaginationNav>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            to={onPageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
            className={
              currentPage === 1 ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
        <PaginationItem key={1}>
          <PaginationLink isActive={currentPage === 1} to={onPageChange(1)}>
            1
          </PaginationLink>
        </PaginationItem>
        {shouldShowPaginationEllipsisStart && (
          <PaginationItem key="ellipsis-start">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {shouldShowPreviousPage && (
          <PaginationItem key={currentPage - 1}>
            <PaginationLink isActive={false} to={onPageChange(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {shouldShowCurrentPage && (
          <PaginationItem key={currentPage}>
            <PaginationLink isActive={true} to={onPageChange(currentPage)}>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {shouldShowNextPage && (
          <PaginationItem key={currentPage + 1}>
            <PaginationLink isActive={false} to={onPageChange(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {shouldShowPaginationEllipsisEnd && (
          <PaginationItem key="ellipsis-end">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            to={onPageChange(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            to={onPageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
            className={
              currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </PaginationNav>
  );
}
