import React from 'react';
import { Input, Select } from './InputComponent';

// Defining types for the props
interface CrudModalProps {
  filters:any;
  setFilters:any;
  handleInputChange :any;
  isModalOpen: boolean;
  toggleModal: () => void;
}
export enum TransactionState {
  CREATED = "CREATED",
  PROCESSING = "PROCESSING",
  SENT = "SENT",
  EXPIRED = "EXPIRED",
  DECLINED = "DECLINED",
  SUSPENDED = "SUSPENDED",
  REFUNDED = "REFUNDED",
  SUCCESSFUL = "SUCCESSFUL",
  REVERSED = "REVERSED",
}

enum TransactionType {
  DEPOSIT = "DEPOSIT",
  TRANSFER = "TRANSFER",
  EXTERNAL_PAYMENT = "EXTERNAL_PAYMENT",
  WITHDRAWAL = "WITHDRAWAL",
  REFUND = "REFUND",
  OTHER = "OTHER",
}
const CrudModal: React.FC<CrudModalProps> = ({filters,setFilters, handleInputChange,isModalOpen, toggleModal }) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
          toggleModal(); // Call the toggle function only if the parent is clicked
        }
      };
      const clearAllFilters = () => {
        setFilters({
          transactionId:"",
          originMinAmount: "",
          originMaxAmount: "",
          destMinAmount: "",
          destMaxAmount: "",
          startDate: "",
          endDate: "",
          description: "",
          type: "",
          transactionState: "",
          originUserId: "",
          destinationUserId: "",
          originDeviceData: "",
          destinationDeviceData: "",
          tags: "",
          originCurrency: "",
          destinationCurrency: "",
          originCountry: "",
          destinationCountry: "",
        });
      };
  return (
    <div className='absolute top-0 left-0 w-full z-100'>
      {/* Modal toggle */}

      {/* Main modal */}
      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="false"
          onClick={handleClick}
          className="flex z-100 overflow-y-auto overflow-x-hidden fixed bg-black bg-opacity-50 top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full min-w-md max-w-fit max-h-full  mx-auto items-end -mb-20">
           
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              
              <div className="flex items-center justify-between p-2 md:px-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Filter
                </h3>
                <button
                  onClick={toggleModal}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

            
             <div className='flex flex-col space-x-2 p-2'>
             <div className='flex space-x-4 p-1 w-full'>
                    <div className='flex space-x-2 w-1/2'>
                          <Input
                              label="Start Date"
                              type="date"
                              name="startDate"
                              placeholder=""
                              onChange={handleInputChange}
                              value={filters.startDate}
                            />
                            <Input
                              label="End Date"
                              type="date"
                              name="endDate"
                              placeholder=""
                              onChange={handleInputChange}
                              value={filters.endDate}
                            />
                    </div>
                  <div className='flex space-x-2 w-1/2'>
                        <Select
                            label="Transaction Status"
                            name="transactionState"
                            onChange={handleInputChange}
                            value={filters.transactionState}
                            options={Object.values(TransactionState)}
                          />
                          <Select
                            label="Transaction Type"
                            name="type"
                            onChange={handleInputChange}
                            value={filters.type}
                            options={Object.values(TransactionType)}
                          />
                  </div>
                 
              </div>
              <div className='flex space-x-4 p-1'>
                         <Input
                            label="Description"
                            name="description"
                            placeholder="lorem ipsum ...."
                            onChange={handleInputChange}
                            value={filters.description}
                          />
                           <Input
                            label="Tags"
                            name="tags"
                            placeholder="online, offline"
                            onChange={handleInputChange}
                            value={filters.tags}
                          />
                       
                         
              </div>
              <div className='flex space-x-4 p-1'>
                  <div className='flex space-x-2'>
                        <Input
                            label="Origin Min. Amount"
                            type="number"
                            name="originMinAmount"
                            placeholder="$2999"
                            onChange={handleInputChange}
                            value={filters.originMinAmount}
                          />
                          <Input
                            label="Origin Max. Amount"
                            type="number"
                            name="originMaxAmount"
                            placeholder="$2999"
                            onChange={handleInputChange}
                            value={filters.originMaxAmount}
                          />
                  </div>
                  <div className='flex space-x-2'>
                        <Input
                            label="Dest. Min. Amount"
                            type="number"
                            name="destMinAmount"
                            placeholder="$2999"
                            onChange={handleInputChange}
                            value={filters.destMinAmount}
                          />
                          <Input
                            label="Dest. Max. Amount"
                            type="number"
                            name="destMaxAmount"
                            placeholder="$2999"
                            onChange={handleInputChange}
                            value={filters.destMaxAmount}
                          />
                  </div>
              </div>
              <div className='flex space-x-4 p-1'>
                  <div className='flex space-x-2'>
                         <Input
                            label="Origin User Id"
                            name="originUserId"
                            placeholder="user_xxx"
                            onChange={handleInputChange}
                            value={filters.originUserId}
                          />
                        <Input
                            label="Origin Device Name"
                            name="originDeviceData"
                            placeholder="device_xxx"
                            onChange={handleInputChange}
                            value={filters.originDeviceData}
                          />
                         
                  </div>
                  <div className='flex space-x-2'>
                  <Input
                            label="Dest. User Id"
                            name="destinationUserId"
                            placeholder="user_xxx"
                            onChange={handleInputChange}
                            value={filters.destinationUserId}
                          />
                        <Input
                            label="Dest. Device Name"
                            name="destinationDeviceData"
                            placeholder="device_xxx"
                            onChange={handleInputChange}
                            value={filters.destinationDeviceData}
                          />
                  </div>
              </div>
              <div className='flex space-x-4 p-1'>
                  <div className='flex space-x-2'>
                         <Input
                            label="Origin Country"
                            name="originCountry"
                            placeholder="e.g. United.."
                            onChange={handleInputChange}
                            value={filters.originCountry}
                          />
                        <Input
                            label="Origin Currency"
                            name="originCurrency"
                            placeholder="USD"
                            onChange={handleInputChange}
                            value={filters.originCurrency}
                          />
                         
                  </div>
                  <div className='flex space-x-2'>
                  <Input
                            label="Dest. Country"
                            name="destinationCountry"
                            placeholder="e.g. India"
                            onChange={handleInputChange}
                            value={filters.destinationCountry}
                          />
                        <Input
                            label="Dest. Currency"
                            name="destinationCurrency"
                            placeholder="IND"
                            onChange={handleInputChange}
                            value={filters.destinationCurrency}
                          />
                  </div>
              </div>
            
              <div className='w-full flex justify-around'>
                          <button
                          onClick={clearAllFilters}
                          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                          
                          Clear
                          </button>
                          <button
                          onClick={toggleModal}
                          className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                          
                          Apply
                          </button>

                  </div>
             </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudModal;
