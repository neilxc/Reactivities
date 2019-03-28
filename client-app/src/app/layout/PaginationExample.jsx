import React from 'react';
import { Pagination } from 'semantic-ui-react';
import { observer } from 'mobx-react';

const PaginationExample = ({ totalPages, activePage, onPageChange }) => (
  <Pagination
    defaultActivePage={activePage + 1}
    totalPages={totalPages}
    onPageChange={(e, data) => onPageChange(e, data)}
  />
);

export default observer(PaginationExample);
