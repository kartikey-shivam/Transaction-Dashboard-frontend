import React, { useEffect, useState } from 'react';
import {
  MaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ShowHideColumnsButton,
  useMaterialReactTable,
} from 'material-react-table';
import { columns } from './makeData';
import { CssBaseline, ThemeProvider, createTheme,  IconButton } from '@mui/material';
import { toast } from 'react-toastify';

const MaterialTable = ({total,handleInputChange, data,isDark }: {total?:number,handleInputChange:any, data: any[],isDark:boolean }) => {
  const [isDownloadingCSV,setIsDownloadingCSV]=useState(Boolean)
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
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, 
  });
  
  useEffect(() => {
    const {pageIndex,pageSize}=pagination
    handleInputChange({pageIndex,pageSize})
    
  }, [pagination.pageIndex, pagination.pageSize]);

  //download csv file function
  const downloadCSV = async () => {
    try {
      let token:any;
      setIsDownloadingCSV(true)
      if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
     }
     
      const response = await fetch(`https://transaction-dashboard-backend-production.up.railway.app/transactions/download-csv`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({data}),
      })
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'transactions.csv'
      a.click()
      toast.success('CSV Downloaded')
    } catch (error) {
      toast.error('Failed to download CSV')
      console.log(error,isDownloadingCSV)
    } finally {
      setIsDownloadingCSV(false)}
}

//custom material table component
  const table = useMaterialReactTable({
    columns,
    data,
    
    renderToolbarInternalActions: ({ table }) => (
      <>
        
        <MRT_GlobalFilterTextField table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        <IconButton onClick={downloadCSV}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 2L12 15M12 15L9 11.5M12 15L15 11.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
        </IconButton>
        
        
      </>
    ),
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      showRowsPerPage: true,
      variant: 'outlined',
    },
    initialState:{
      density:'compact',
    },
    manualPagination: true, 
    rowCount: total,
    onPaginationChange: setPagination, 
    state: { pagination },
    paginationDisplayMode: 'pages',
    enableFullScreenToggle:false,
    enableColumnFilters:false,
    layoutMode: 'grid-no-grow',
    enableDensityToggle:false, 

  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
        <MaterialReactTable table={table} />
    </ThemeProvider>
  );
};

export default MaterialTable;
