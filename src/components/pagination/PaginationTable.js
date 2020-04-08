import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationTable = ({
  per_page,
  total_data,
  handleClick,
  current_page,
}) => {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(total_data / per_page); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Pagination size="sm" aria-label="Page navigation">
        <PaginationItem key={1} disabled={current_page === 1 ? true : false}>
          <PaginationLink first onClick={() => handleClick(1)} href="#">
            First
          </PaginationLink>
        </PaginationItem>

        <PaginationItem key={2} disabled={current_page <= 1}>
          <PaginationLink
            onClick={() => handleClick(current_page - 1)}
            previous
            href="#"
          >
            Prev
          </PaginationLink>
        </PaginationItem>

        <PaginationItem key={3} active={true}>
          <PaginationLink onClick={() => handleClick(current_page)} href="#">
            {current_page}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem
          key={4}
          disabled={current_page < pageNumbers.length - 1 ? false : true}
        >
          <PaginationLink
            onClick={() => handleClick(current_page + 1)}
            next
            href="#"
          >
            Next
          </PaginationLink>
        </PaginationItem>

        <PaginationItem
          key={5}
          disabled={current_page === pageNumbers.length ? true : false}
        >
          <PaginationLink
            last
            onClick={() => handleClick(pageNumbers.length)}
            href="#"
          >
            Last
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default PaginationTable;
