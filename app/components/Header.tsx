
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { handleStart, handleStop } from '../api/cronJob'



interface HeaderProps {
  changeTheme: () => void
  profileImage: string
  user: User
  status:boolean
  setStatus:any
}
interface User {
  username : string,
  email:string,
}
const Header: React.FC<HeaderProps> = ({
  
  changeTheme,
  profileImage,
  user,
  status,setStatus
}) => {
  const [submenuVisible, setSubmenuVisible] = useState(false)
  const [isChecked, setIsChecked] = useState(false);

  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };
  

  const handleSwitch = () => {
    setIsChecked(!isChecked);
  };
 useEffect(()=>{
    if(isChecked){
      handleStart()
      setStatus(true)
    }else{
      handleStop()
      setStatus(false)
    }


 },[isChecked])
  return (
    <header
      className={`h-20 w-full px-8 fixed top-0 flex items-center border-none z-50 glass-bg sideMenu`}
    >
      <div className="container mx-auto flex items-center gap-4">
        <div className="grow relative">
          <button
            onClick={() => {
              setSubmenuVisible(!submenuVisible)
            }}
            className='flex items-center'
          >
            <Image
              src={profileImage}
              alt="Avatar"
              width={50}
              height={50}
              className="rounded-full"
              style={{ objectFit: 'cover' }}
            />
            <div className='ml-4'>
              {user.username}
            </div>
          </button>

          {submenuVisible && (
            <div className={`p-4 absolute -bottom-24 left-0 subMenu`}>
              <p className="mb-2">
                {user.username}
              </p>
              <p className="mb-2">
                {user.email}
              </p>
              <button
                className="flex items-center gap-2"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 relative">
        <div className="flex flex-col justify-center -mb-5 space-x-2 items-center">
      <div className="relative inline-block w-11 h-5">
        <input
          id="switch-component-custom"
          type="checkbox"
          className="peer appearance-none w-11 h-4 bg-slate-300 border border-slate-300 rounded-full checked:bg-green-600 checked:border-green-600 cursor-pointer transition-colors duration-300"
          checked={isChecked}
          onChange={handleSwitch}
        />
        <label
          htmlFor="switch-component-custom"
          className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-slate-800 cursor-pointer"
        ></label>
      </div>
      <span>Cron Job</span>
    </div>

          
     

         
        </div>

        <div>
          <input
            className="darkModeToggle"
            type="checkbox"
            onClick={changeTheme}
          />
        </div>
        <button onClick={handleLogout} className="-mt-2">
        
        <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    height="25px"
    width="25px"
    version="1.1"
    id="Capa_1"
    viewBox="0 0 30.143 30.143"
    xmlSpace="preserve"
  >
    <g>
      <path
        style={{ fill: "red" }}
        d="M20.034,2.357v3.824c3.482,1.798,5.869,5.427,5.869,9.619c0,5.98-4.848,10.83-10.828,10.83 c-5.982,0-10.832-4.85-10.832-10.83c0-3.844,2.012-7.215,5.029-9.136V2.689C4.245,4.918,0.731,9.945,0.731,15.801 c0,7.921,6.42,14.342,14.34,14.342c7.924,0,14.342-6.421,14.342-14.342C29.412,9.624,25.501,4.379,20.034,2.357z"
      />
      <path
        style={{ fill: "red" }}
        d="M14.795,17.652c1.576,0,1.736-0.931,1.736-2.076V2.08c0-1.148-0.16-2.08-1.736-2.08 c-1.57,0-1.732,0.932-1.732,2.08v13.496C13.062,16.722,13.225,17.652,14.795,17.652z"
      />
    </g>
        </svg>
</button>
      </div>
    </header>
  )
}

export default Header
