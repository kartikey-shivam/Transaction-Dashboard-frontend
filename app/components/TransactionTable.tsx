function formatDateAndTime(dateString: string | number | Date) {
  const date = new Date(dateString);


  const options: Intl.DateTimeFormatOptions = {
    // weekday: 'long',   // "Monday"
    year: 'numeric',   // "2024"
    month: 'long',     // "November"
    day: 'numeric',    // "21"
    hour: '2-digit',   // "12"
    minute: '2-digit', // "59"
    second: '2-digit', // "54"
    hour12: true       // 12-hour format (AM/PM)
  };


  return date.toLocaleString('en-US', options);
}
const TransactionTable = ({ transactions }: { transactions: any[] }) => {
  return (
    <table className="min-w-full table-auto bg-opacity-5  border-[2px] border-gray-900 mt-8">
      <thead>
        <tr className="text-left bg-gray-800 bg-opacity-50">
          <th className="px-4 py-2 ">SNo.</th>
          <th className="px-4 py-2 ">Transaction ID</th>
          <th className="px-4 py-2 ">Date and Time</th>
          <th className="px-4 py-2 ">Amount</th>
          <th className="px-4 py-2 ">Description</th>
        </tr>
      </thead>
      <tbody>
        {transactions?.map((transaction, index) => (
          <tr key={transaction.id || index} className="hover:bg-gray-800">
            <td className="px-4 py-2">{index+1}</td>
            <td className="px-4 py-2">{transaction.transactionId}</td>
            <td className="px-4 py-2">{formatDateAndTime(transaction.date)}</td>
            <td className="px-4 py-2">{transaction.amount}</td>
            <td className="px-4 py-2">{transaction.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
