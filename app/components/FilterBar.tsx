'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
interface Filters {
  transactionId: string;
  originMinAmount: string;
  originMaxAmount: string;
  destMinAmount: string;
  destMaxAmount: string;
  startDate: string;
  endDate: string;
  description: string;
  type: string;
  transactionState: string;
  originUserId: string;
  destinationUserId: string;
  originDeviceData: string;
  destinationDeviceData: string;
  tags: string;
  currency: string;
  country: string;
}

const TransactionFilter = ({filters,handleInputChange, setTransactions ,toggleModal }: {filters:Filters,handleInputChange:any,setTransactions:any,toggleModal:any}) => {
   const [debouncedFilters, setDebouncedFilters] = useState(filters);

   useEffect(() => {
    console.log(filters)
     const handler = setTimeout(() => {
       setDebouncedFilters(filters); 
     }, 500); 
 
     return () => clearTimeout(handler); 
   }, [filters]);
 
   const handleFilter = async () => {
     try {
       const queryParams = new URLSearchParams();
       if (debouncedFilters.transactionId) queryParams.append("transactionId", debouncedFilters.transactionId);
       if (debouncedFilters.originMinAmount) queryParams.append("originMinAmount", debouncedFilters.originMinAmount);
       if (debouncedFilters.originMaxAmount) queryParams.append("originMaxAmount", debouncedFilters.originMaxAmount);
       if (debouncedFilters.destMinAmount) queryParams.append("destMinAmount", debouncedFilters.destMinAmount);
       if (debouncedFilters.destMaxAmount) queryParams.append("destMaxAmount", debouncedFilters.destMaxAmount);
       if (debouncedFilters.startDate) queryParams.append("startDate", debouncedFilters.startDate);
       if (debouncedFilters.endDate) queryParams.append("endDate", debouncedFilters.endDate);
       if (debouncedFilters.description) queryParams.append("description", debouncedFilters.description);
       if (debouncedFilters.type) queryParams.append("type", debouncedFilters.type);
       if (debouncedFilters.transactionState) queryParams.append("transactionState", debouncedFilters.transactionState);
       if (debouncedFilters.originUserId) queryParams.append("originUserId", debouncedFilters.originUserId);
       if (debouncedFilters.destinationUserId) queryParams.append("destinationUserId", debouncedFilters.destinationUserId);
       if (debouncedFilters.originDeviceData) queryParams.append("originDeviceData", debouncedFilters.originDeviceData);
       if (debouncedFilters.destinationDeviceData) queryParams.append("destinationDeviceData", debouncedFilters.destinationDeviceData);
 
       if (debouncedFilters.tags) {
         const tagsString = Array.isArray(debouncedFilters.tags)
           ? debouncedFilters.tags.join(",")
           : debouncedFilters.tags;
         queryParams.append("tags", tagsString);
       }
       console.log("42",debouncedFilters,queryParams)
       const response = await fetch(
         `${process.env.NEXT_PUBLIC_API_URL}/transactions/filter?${queryParams.toString()}`,
         {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${localStorage.getItem("token")}`,
           },
         }
       );
       
       const filteredTransactions = await response.json();
       console.log(filteredTransactions,"55")
       setTransactions(filteredTransactions.transactions);
     } catch (error) {
       toast.error("Failed to fetch transactions. Please try again later.");
     }
   };
 
   useEffect(() => {
     handleFilter();
   }, [debouncedFilters]);
  return (
    <div>
      <div className="flex justify-between">
      

        <div>
          <label htmlFor="description" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <input
            name="transactionId"
            value={filters.transactionId}
            onChange={handleInputChange}
            id="description"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm
             rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 px-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description"
          />
        </div>

        <div>
          <label htmlFor="tags" className="block mb-1 text-md font-medium text-gray-900 dark:text-white">
            Tags
          </label>
          <input
            type="text"
            name="tags"
            value={filters.tags}
            onChange={handleInputChange}
            id="tags"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
            rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 px-2.5 
             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
             dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Tags"
          />
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            onClick={toggleModal}
            className="text-gray-200 bg-blue-700 bg-opacity-50 shadow-bottom-only hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto p-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M19 3H5C3.58579 3 2.87868 3 2.43934 3.4122C2 3.8244 2 4.48782 2 5.81466V6.50448C2 7.54232 2 8.06124 2.2596 8.49142C2.5192 8.9216 2.99347 9.18858 3.94202 9.72255L6.85504 11.3624C7.49146 11.7206 7.80967 11.8998 8.03751 12.0976C8.51199 12.5095 8.80408 12.9935 8.93644 13.5872C9 13.8722 9 14.2058 9 14.8729L9 17.5424C9 18.452 9 18.9067 9.25192 19.2613C9.50385 19.6158 9.95128 19.7907 10.8462 20.1406C12.7248 20.875 13.6641 21.2422 14.3321 20.8244C15 20.4066 15 19.4519 15 17.5424V14.8729C15 14.2058 15 13.8722 15.0636 13.5872C15.1959 12.9935 15.488 12.5095 15.9625 12.0976C16.1903 11.8998 16.5085 11.7206 17.145 11.3624L20.058 9.72255C21.0065 9.18858 21.4808 8.9216 21.7404 8.49142C22 8.06124 22 7.54232 22 6.50448V5.81466C22 4.48782 22 3.8244 21.5607 3.4122C21.1213 3 20.4142 3 19 3Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default TransactionFilter;
