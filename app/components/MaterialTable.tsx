import React, { useState } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { columns } from './makeData';
import { Button, CssBaseline, ThemeProvider, createTheme, Paper } from '@mui/material';

const Example = ({ data,isDark }: { data: any[],isDark:boolean }) => {

  const theme = createTheme({
    palette: {
      mode: isDark?'dark':'light',
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
        
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: isDark ? '#fff' : '#000', 
          },
        },
      },
    },
  });

  // Setup the table with dynamic layoutMode
  const table = useMaterialReactTable({
    columns,
    data,
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      showRowsPerPage: true,
      variant: 'outlined',
    },
    initialState:{
      density:'compact',
    },
    paginationDisplayMode: 'pages',
    enableFullScreenToggle:false,
    enableColumnFilters:false,
    layoutMode: 'grid-no-grow',
    enableDensityToggle:false, 
// Example layout, you can modify as needed
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
        <MaterialReactTable table={table} />
    </ThemeProvider>
  );
};

export default Example;
