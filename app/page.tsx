"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Head from "next/head";
import { getTransactions, getUser } from "./api/transaction";
import TransactionFilter from "./components/FilterBar";
import CrudModal from "./components/Modal";
import Example from "./components/MaterialTable";
import TotalBox from "./components/TotalBox";
import { verityToken } from "./api/auth";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner";
import { getCronJobStatus } from "./api/cronJob";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true); // Default to true to show loading initially
  const [transactions, setTransactions] = useState([]);
  const [totalTransaction,setTotalTransaactions]=useState<number>();
  const [status,setStatus] = useState<boolean>(false);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [darkThemeEnabled, setDarkThemeEnabled] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [filters, setFilters] = useState({
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
    currency: "",                
    country: "",                 
  });
  

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
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
      currency: "",
      country: "",
    });
  };
  

  const changeTheme = () => {
    setDarkThemeEnabled(!darkThemeEnabled);
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Fetch data for transactions and user
  const fetchData = async (token: string) => {
    try {
      const [transactionsData, userData] = await Promise.all([
        getTransactions(token),
        getUser(token),
      ]);
      setTransactions(transactionsData);
      setUser(userData.user);
    } catch (error) {
      toast.error("Failed to fetch data. Redirecting to login.");
      router.push("/login");
    }
  };
  const verifyAndFetch = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token)
      if (!token) {
        toast.error("No token found. Redirecting to login.");
        router.push("/login");
        return;
      }


      const isVerified = await verityToken(token);

      if (!isVerified.success) {
        toast.error("Token is invalid. Redirecting to login.");
        router.push("/login");
        return;
      }

      await fetchData(token);
    } catch (error) {
      toast.error("An error occurred. Redirecting to login.");
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (status ) {
      intervalRef.current = setInterval(() => {
        verifyAndFetch();
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status, verifyAndFetch]);
  useEffect(() => {
    verifyAndFetch();
  }, [status,router]);

  useEffect(() => {
    const html = document.documentElement;
    if (darkThemeEnabled) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
   
    getStatus()
  }, [darkThemeEnabled]);
  const getStatus=async()=>{
    const token = localStorage.getItem("token")
    try {
      if(token){
        const res = await getCronJobStatus(token)
        console.log(res)
        if(res.success){
          setStatus(res.status)
          toast.success(res.message)
        }else{
          toast.error(res.message)
        }

      }else{
        toast.error("token not found. Please relogin")
      }
    } catch (error) {
        toast.error("Error Fetching Cron Job Status")
    }
}
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  function handleClearFilters(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
    {!isLoading && <div className="relative">
      <Head>
        <title>Transaction Analytics</title>
      </Head>

      {user && <Header
        changeTheme={changeTheme}
        profileImage={'/user.png'}
        user={user}
        status={status} setStatus={setStatus}
      />}

      <div className="absolute top-0 left-0 right-0">
        {/* Background Circles */}
        <div className="absolute top-0 overflow-visible opacity-50 dark:opacity-30 left-16">
          <div
            className={`mix-blend-multiply absolute w-[800px] h-[900px] rounded-[40rem] circleObj`}
          ></div>
        </div>
        <div className="absolute overflow-visible opacity-50 dark:opacity-30 top-28 left-52">
          <div
            className={`mix-blend-multiply absolute w-[800px] h-[600px] rounded-[40rem] circleObj2`}
          ></div>
        </div>
      </div>

      <main className="container mx-auto pt-24 relative z-40 px-4 md:px-0">
      <section className="totals flex flex-col md:flex-row justify-between gap-4 my-8">
          {transactions && <TotalBox title="Overall Transaction" value={transactions.length}  />}
          <TotalBox title="Overall expenses" value={0} />
         
        </section>
      <div className="glass-bg p-4">
        <TransactionFilter filters={filters}  handleInputChange={handleInputChange} setTransactions={setTransactions} toggleModal={toggleModal} />
      </div>
        <div className="w-full mt-10 glass-bg">
        {transactions && <Example data={transactions} isDark={darkThemeEnabled} />} 
        </div>
    
        <CrudModal handleClearFilter={handleClearFilters} filters={filters} handleInputChange={handleInputChange} isModalOpen={isModalOpen} toggleModal={toggleModal} />
   
        <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 mt-8">
          
        </div>

       
      </main>

      <Footer />
    </div>}
    </>
    
  );
};

export default Home;

