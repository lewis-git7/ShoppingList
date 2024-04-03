import { useState } from "react"

export default function ListItem({key, item, quantity, metric}){


  const [checkItem, setCheckItem] = useState(false);
  let checkItemStyles = "line-through text-red-800 flex p-2 mx-4 mt-4 border-b"

  function capitaliseString(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function checkItemClick(){
    setCheckItem((prevValue)=>!prevValue)
    
  }


  return(
    <li onClick={checkItemClick}
        className={checkItem ? checkItemStyles : "flex p-2 mx-4 mt-4 border-b"}
        key={key}>
      <span 
        className="font-bold mr-auto">
        {capitaliseString(item)}
      </span>{quantity}{metric}
    </li>
  )
}