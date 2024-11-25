import { type MRT_ColumnDef } from 'material-react-table';
import { formatDate, formatTime } from '../utils/utils';

// Transaction type reflecting the MongoDB schema
export type Transaction = {
  sno: number; // Serial number for table row indexing
  transactionId: string;
  timestamp: number; // Unix timestamp for the transaction time
  type: string; // Corresponds to TransactionType enum
  description: string;
  originUserId?: string; // Optional origin user ID
  destinationUserId?: string; // Optional destination user ID
  transactionState?: string; // Corresponds to TransactionState enum
  originAmountDetails?: {
    transactionAmount: number;
    transactionCurrency: string; // Corresponds to Currency enum
    country?: string; // Corresponds to Country enum
  };
  destinationAmountDetails?: {
    transactionAmount: number;
    transactionCurrency: string; // Corresponds to Currency enum
    country?: string; // Corresponds to Country enum
  };
  originDeviceData?: string; // Origin device data
  destinationDeviceData?: string; // Destination device data
  tags?: { [key: string]: string }; // Tags as a key-value map
};

// Material React Table column definitions
export const columns: MRT_ColumnDef<Transaction>[] = [
  // {
  //   accessorKey: 'sno',
  //   header: '#',
  //   size:50,
  //   Cell: ({ row }) => row.index + 1,
  //   enableColumnActions:false,
  //   visibleInShowHideMenu:false,
  //   enableSorting:false,

  // },
  {
    accessorKey: 'transactionId',
    header: 'Transaction ID',
    size:200,
    visibleInShowHideMenu:false,
    enableSorting:false,


  },

  {
    accessorKey: 'type',
    header: 'Type',
    Cell:({cell})=>{
      const getButtonStyles = (type: string) => {
        switch (type) {
          case 'DEPOSIT':
            return 'border-green-500 text-green-500 hover:border-green-700';
          case 'TRANSFER':
            return 'border-blue-500 text-blue-500 hover:border-blue-700';
          case 'EXTERNAL_PAYMENT':
            return 'border-yellow-500 text-yellow-500 hover:border-yellow-700';
          case 'WITHDRAWAL':
            return 'border-red-500 text-red-500 hover:border-red-700';
          case 'REFUND':
            return 'border-purple-500 text-purple-500 hover:border-purple-700';
          case 'OTHER':
            return 'border-gray-500 text-gray-500 hover:border-gray-700';
          default:
            return 'border-indigo-500 text-indigo-500 hover:border-indigo-700'; // Default style
        }
      };
    
      return (
            <button
              className={`py-1 px-2 rounded-full text-xs font-bold border bg-transparent duration-300 ${getButtonStyles(
                cell.getValue<string>()
              )}`}
            >
            {cell.getValue<string>()}
            </button>
      );
    },
    size:200,
    enableSorting:false,

  },
  {
    accessorKey: 'timestamp',
    header: 'Date and Time',
    Cell: ({ cell }) => <div>
      <p>{formatDate(cell.getValue<number>())}</p>
      <p>{formatTime(cell.getValue<number>())}</p>
    </div>, // Formats timestamp
  },
  {
    accessorKey: 'transactionState',
    header: 'Status',
    enableSorting:false,

    Cell:({cell})=>{
      const getButtonStyles = (state: string) => {
        switch (state) {
          case 'SUSPENDED':
            return 'border-gray-500 text-gray-500 hover:border-gray-700 hover:text-gray-700';
          case 'SENT':
            return 'border-blue-500 text-blue-500 hover:border-blue-700 hover:text-blue-700';
          case 'PROCESSING':
            return 'border-yellow-500 text-yellow-500 hover:border-yellow-700 hover:text-yellow-700';
          case 'EXPIRED':
            return 'border-orange-500 text-orange-500 hover:border-orange-700 hover:text-orange-700';
          case 'DECLINED':
            return 'border-red-500 text-red-500 hover:border-red-700 hover:text-red-700';
          case 'CREATED':
            return 'border-purple-500 text-purple-500 hover:border-purple-700 hover:text-purple-700';
          case 'SUCCESSFUL':
            return 'border-green-500 text-green-500 hover:border-green-700 hover:text-green-700';
          case 'REFUNDED':
            return 'border-teal-500 text-teal-500 hover:border-teal-700 hover:text-teal-700';
          case 'REVERSED':
            return 'border-pink-500 text-pink-500 hover:border-pink-700 hover:text-pink-700';
          default:
            return 'border-indigo-500 text-indigo-500 hover:border-indigo-700 hover:text-indigo-700'; // Default style
        }
      };
    
      return (
        <button
          className={`py-1 px-2 rounded-full text-xs font-bold border bg-transparent duration-300 ${getButtonStyles(
            cell.getValue<string>()
          )}`}
        >
          {cell.getValue<string>()}
        </button>
      );
    }
  },
  {
    accessorKey: 'description',
    header: 'Description',
    size:200,
  },
  {
    accessorKey: 'originUserId',
    header: 'Origin User ID',
  },
  {
    accessorKey: 'destinationUserId',
    header: 'Dest. User ID',
  },

  {
    accessorKey: 'originAmountDetails.transactionAmount',
    header: 'Origin Amount',
    Cell: ({ row }) => (
      <div>
        {row.original.originAmountDetails
          ? `${row.original.originAmountDetails.transactionCurrency} ${row.original.originAmountDetails.transactionAmount}`
          : '-'}
      </div>
    ),
  },
  {
    accessorKey: 'originAmountDetails.country',
    header: 'Origin Country',
    Cell: ({ row }) => (
      <div>{row.original.originAmountDetails?.country || '-'}</div>
    ),
  },
  {
    accessorKey: 'destinationAmountDetails.transactionAmount',
    header: 'Dest. Amount',
    size:200,
    Cell: ({ row }) => (
      <div>
        {row.original.destinationAmountDetails
          ? `${row.original.destinationAmountDetails.transactionCurrency} ${row.original.destinationAmountDetails.transactionAmount}`
          : '-'}
      </div>
    ),
  },
  {
    accessorKey: 'destinationAmountDetails.country',
    header: 'Dest. Country',
    Cell: ({ row }) => (
      <div>{row.original.destinationAmountDetails?.country || '-'}</div>
    ),
  },
  {
    accessorKey: 'originDeviceData',
    header: 'Origin Device',
    enableSorting:false,

    Cell: ({ cell }) => <div>{cell.getValue<string>() || '-'}</div>,
  },
  {
    accessorKey: 'destinationDeviceData',
    header: 'Dest. Device',
    enableSorting:false,

    Cell: ({ cell }) => <div>{cell.getValue<string>() || '-'}</div>,
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
    enableSorting:false,

    Cell: ({ cell }) => (
      <div>
        {cell.getValue<{ [key: string]: string }>()
          ? Object.entries(cell.getValue<{ [key: string]: string }>())
              .map(([key, value]) => `${key}: ${value}`)
              .join(', ')
          : '-'}
      </div>
    ),
  },
];
