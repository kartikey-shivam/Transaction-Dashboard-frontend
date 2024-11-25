// interface Input {
//     handleInputChange:()=>void
//     filters:Object
// }


export const Input=({name,label,value,onChange,type,placeholder}:any)=>{
    return (
        <div className="col-span-2 sm:col-span-1 w-full">
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white w-full"
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-1 px-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder={placeholder}
          onChange={onChange}
          value={value}

          
        />
      </div>
    );
}

export const Select=({name,label,value,onChange,options}:any)=>{
    return (
        <div className="col-span-2 sm:col-span-1 w-full">
        <label  htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <select  name={name} value={value} onChange={onChange} id={name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1 px-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            <option value="" disabled>
            Select {label.toLowerCase()}
            </option>
          
            {options?.map((option:any)=>{
                return <option key={option} value={option}>{option}</option>
            })}
          
        </select>
        </div>
    );

}