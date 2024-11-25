export const getTransactions = async (token: string) => {
    const res = await fetch(`https://transaction-dashboard-backend-production.up.railway.app/transactions`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    const data = await res.json();
    return data;
  };
  
  export const getUser = async (token: string) => {
    const res = await fetch(`https://transaction-dashboard-backend-production.up.railway.app/user/getUser`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    const data = await res.json();
    return data;
  };

  
  