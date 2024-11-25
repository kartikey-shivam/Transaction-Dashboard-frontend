export const login = async (email: string, password: string) => {
    const res = await fetch(`https://transaction-dashboard-backend-production.up.railway.app/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    return data.success ? { success: true, token: data.token } : { success: false, message: data.error };
  };
  
  export const register = async (username:string,email: string, password: string) => {
    const res = await fetch(`https://transaction-dashboard-backend-production.up.railway.app/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username,email, password }),
    });
    const data = await res.json();
    return { success: data.success, message: data.message };
  };
  
  export const verityToken = async (token:string)=>{
          const res = await fetch(`https://transaction-dashboard-backend-production.up.railway.app/api/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token}),
          });
          const data = await res.json();
          return { success: data.success, message: data.message };
  }