'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Input, Select } from './InputComponent';
import { TransactionState } from './Modal';
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
  originCurrency: string;
  destinationCurrency: string;
  originCountry: string;
  destinationCountry: string;
  page:string,
  limit:string

}

const TransactionFilter = ({filters,handleInputChange, setTransactions,setTotal ,toggleModal }: {filters:Filters,handleInputChange:any,setTransactions:any,setTotal:any,toggleModal:any}) => {
   const [debouncedFilters, setDebouncedFilters] = useState(filters);

   useEffect(() => {
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
       if (debouncedFilters.originCountry) queryParams.append("originCountry", debouncedFilters.originCountry);
       if (debouncedFilters.destinationCountry) queryParams.append("destinationCountry", debouncedFilters.destinationCountry);
       if (debouncedFilters.originCurrency) queryParams.append("originCurrency", debouncedFilters.originCurrency);
       if (debouncedFilters.destinationCurrency) queryParams.append("destinationCurrency", debouncedFilters.destinationCurrency);
       if (debouncedFilters.page) queryParams.append("page", debouncedFilters.page);
       if (debouncedFilters.limit) queryParams.append("limit", debouncedFilters.limit);
 
       if (debouncedFilters.tags) {
         const tagsString = Array.isArray(debouncedFilters.tags)
           ? debouncedFilters.tags.join(",")
           : debouncedFilters.tags;
         queryParams.append("tags", tagsString);
       }
       let token:any;
       if (typeof window !== "undefined") {
        token = localStorage.getItem("token");
     }
     
       const response = await fetch(
         `https://transaction-dashboard-backend-production.up.railway.app/transactions/filter?${queryParams.toString()}`,
         {
           method: "GET",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
           },
         }
       );
       
       const filteredTransactions = await response.json();
       setTotal(filteredTransactions.total)
       setTransactions(filteredTransactions.transactions);
     } catch (error) {
       toast.error("Failed to fetch transactions. Please try again later.");
       console.log(error)
     }
   };
 
   useEffect(() => {
     handleFilter();
   }, [debouncedFilters]);
  return (
    <div className='flex flex-col spac-y-4 relative'>
        <div className=''>Search Transaction By</div>
      <div className="flex justify-between p-4">
      
        <div className='flex space-x-4 w-full'>
            <Input 
              label="Transaction Id"
              name="transactionId"
              placeholder="TXN-xxxxxxxx"
              onChange={handleInputChange}
              value={filters.transactionId}
            />
            <Input 
              label="Description"
              name="description"
              placeholder="lorem ipsum ..."
              onChange={handleInputChange}
              value={filters.description}
            />
             <Select
                label="Transaction Status"
                name="transactionState"
                onChange={handleInputChange}
                value={filters.transactionState}
                options={Object.values(TransactionState)}
              />

        </div>

        

        <div className="flex items-end absolute top-0 right-0">
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
