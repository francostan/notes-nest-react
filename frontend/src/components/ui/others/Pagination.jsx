import React from 'react';
import { Pagination, Box } from '@mui/material';
import PropTypes from 'prop-types';

const Paging = ({ pages, page, setPage }) => {
  if (pages === 0) return null;
  if (pages === 1) setPage(1);
  return (
    <Box display="flex" justifyContent="center" my={4}>
      <Pagination
        siblingCount={0}
        count={pages}
        color="primary"
        page={page}
        onChange={(e, value) => setPage(value)}
      />
    </Box>
  );
};


export default Paging;