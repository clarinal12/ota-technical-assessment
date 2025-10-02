import React, { useMemo } from "react";
import { PaginationProps } from "./pagination.types";
import styles from "./pagination.module.css";

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage = 10,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate visible pages (first, last, 1 before/after current)
  const visiblePages = useMemo<(number | '...')[]>(() => {
    const pages: (number | '...')[] = [];
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1); // always show first page

    if (startPage > 2) {
      pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    if (totalPages > 1) {
      pages.push(totalPages); // always show last page
    }

    return pages;
  }, [currentPage, totalPages]);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageButton}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {visiblePages.map((page, idx) =>
        typeof page === "number" ? (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={
              currentPage === page
                ? styles.pageNumberButtonSelected
                : styles.pageNumberButton
            }
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${idx}`}>...</span>
        )
      )}

      <button
        className={styles.pageButton}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
