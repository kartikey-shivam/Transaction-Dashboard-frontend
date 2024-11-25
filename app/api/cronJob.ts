import { toast } from "react-toastify";

export const cronJobStart = async (token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cron/start`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    const data = await res.json();
    return data;
  };
  
  export const cronJobStop = async (token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cron/stop`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    const data = await res.json();
    return data;
  };
  export const getCronJobStatus = async (token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cron/status`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
    });
    const data = await res.json();
    return data;
  };
  let token:any;
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
  }
  export const handleStart = async ()=>{
      try {
          if(token){
            const res = await cronJobStart(token)
            if(res.success){
              toast.success(res.message)
            }else{
              toast.error(res.message)
            }

          }else{
            toast.error("token not found. Please relogin")
          }
      } catch (error) {
          toast.error(`${error}`)
      }
  }
  export const handleStop = async()=>{
      try {
        if(token){
          const res = await cronJobStop(token)
          if(res.success){
            toast.success(res.message)
          }else{
            toast.error(res.message)
          }

        }else{
          toast.error("token not found. Please relogin")
        }
      } catch (error) {
          toast.error(`${error}`)
      }
  }