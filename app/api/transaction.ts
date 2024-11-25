export const getTransactions = async (token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, {
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getUser`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    const data = await res.json();
    return data;
  };

  
  