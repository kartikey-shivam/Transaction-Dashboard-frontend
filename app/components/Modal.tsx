import React, { useState } from 'react';

// Defining types for the props
interface CrudModalProps {
  handleClearFilter:()=>void;
  filters:any;
  handleInputChange :any;
  isModalOpen: boolean;
  toggleModal: () => void;
}

const CrudModal: React.FC<CrudModalProps> = ({handleClearFilter,filters, handleInputChange,isModalOpen, toggleModal }) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
          toggleModal(); // Call the toggle function only if the parent is clicked
        }
      };
  return (
    <div className='absolute top-0 left-0'>
      {/* Modal toggle */}

      {/* Main modal */}
      {isModalOpen && (
        <div
          id="crud-modal"
          tabIndex={-1}
          aria-hidden="false"
          onClick={handleClick}
          className="flex overflow-y-auto overflow-x-hidden fixed bg-black bg-opacity-50 top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative p-4 w-full max-w-md max-h-full  mx-auto items-center">
           
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

            
              <form className="p-2 md:px-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="minAmount"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Min. Amount
                    </label>
                    <input
                      type="number"
                      name="minPrice"
                      id="minPrice"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$2999"
                      onChange={handleInputChange}
                      value={filters.minPrice}

                      
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                        htmlFor="maxAmount"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Max. Amount
                        </label>
                        <input
                        type="number"
                        name="maxPrice"
                        id="maxPrice"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="$2999"
                        onChange={handleInputChange}
                        value={filters.maxPrice}
                        
                        />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      htmlFor="startDate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      id="startDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder=""
                      onChange={handleInputChange}
                      value={filters.startDate}
                      
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                  <label
                      htmlFor="endDate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      id="endDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder=""
                      onChange={handleInputChange}
                      value={filters.endDate}
                      
                    />
                  </div>
                  
                </div>
                <div className='w-full flex justify-around'>
                        <button
                        onClick={handleClearFilter}
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
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudModal;
