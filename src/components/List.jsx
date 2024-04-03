import { useSelector, useDispatch } from "react-redux"
import { listActions } from "../store/list-slice";
import { useState } from "react";
import ListItem from "./ListItem";


export default function List(){
  
  const listItems = useSelector((state) => state.list.items)
  const dispatch = useDispatch();
  const [clearListPrompt, setClearListPrompt] = useState(false);
  const [newItem, setNewItem] = useState({
    item: '',
    quantity: 0,
    metric: ''
  });
  
  function clearListPromptFunction(e){
    e.preventDefault();
    setClearListPrompt(true);
  }

  function clearList(){
    dispatch(listActions.clearList());
    setClearListPrompt(false);
  }
  
 function handleAddItemChange(value, identifier){
    setNewItem((prevValues)=>({
      ...prevValues,
      [identifier]: value
    }))
  }

  async function addItem(e){
    e.preventDefault();
    const isItemInArray = (item) => item.item === newItem.item && item.metric === newItem.metric;
    if(listItems.findIndex(isItemInArray) === -1){
      
      dispatch(listActions.addItem(newItem))
    }else{
      let itemIndex = listItems.findIndex(isItemInArray);
      let updatedItem = {
        ...listItems[itemIndex],
        item: listItems[itemIndex].item,
        quantity: Number(listItems[itemIndex].quantity) + Number(newItem.quantity),
        metric: listItems[itemIndex].metric
      }
      dispatch(listActions.updateItemByIndex({index: itemIndex, newItem: updatedItem}))
      
    }
    
    await fetch('https://shoppinglist-79f9d-default-rtdb.firebaseio.com/list.json',
    {
      method: 'PUT',
      body: JSON.stringify(listItems)
    })
     setNewItem({
      item: '',
      quantity: 0,
      metric: ''
    })
  }

return(
    <div className="flex flex-row justify-center h-screen">
      <div className="flex flex-row justify-center bg-slate-100 border border-black rounded-lg my-8 w-11/12 lg:w-1/3">
        <div className="mt-8">
          <h1 className="text-2xl text-center">Shopping List</h1>
          <div className="flex flex-col items-center justify-center mt-2">
            <input value={newItem.item} onChange={(e) => handleAddItemChange(e.target.value, 'item')} className="rounded-md p-2 m-2 w-full italic border" placeholder="New Item"></input>
            <div className="flex flex-row justify-center">
              <input value={newItem.quantity} onChange={(e) => handleAddItemChange(e.target.value, 'quantity')}className="rounded-md p-2 mr-2 w-1/2 italic border" placeholder="Amount"></input>
              <select value={newItem.metric} onChange={(e) => handleAddItemChange(e.target.value, 'metric')}className="py-3 px-4 pe-9 blackk ml-2 w-1/2 border-gray-200 rounded-lg text-sm ">
                <option value=""></option>
                <option value="g">g</option>
                <option value="ml">ml</option>
                <option value=" whole"> whole</option>
              </select>

            </div>
            
            <button onClick={addItem} className="px-4 text-white mt-2 bg-green-600 rounded border-blue-200">Add</button>
          </div>
           
          <div className="h-3/5 mt-4 overflow-y-scroll border-t rounded-lg border-slate-400 pb-8">
            <p className="flex justify-center text-sm mt-4 text-neutral-700 italic">Tap an item to check from list!</p>
            <ul className="py-2 px-12">
              {listItems.map((item)=>{
                return(
                  <ListItem key={item.item} item={item.item} quantity={item.quantity} metric={item.metric}/>
                )
              })}
            </ul>
            
          </div>
          
          
          <div className="mt-2 w-full mr-2">
              <div className="">
               {clearListPrompt ? <button onClick={clearList} className="rounded-lg border p-2 text-white bg-red-600 font-semibold">Are you sure? Clear List</button> : <button onClick={clearListPromptFunction} className="rounded-lg border p-2 text-white bg-yellow-400 font-semibold">Clear List</button>}

              </div>
              
          </div>
            
        </div>
        
      </div>
    </div>
    
  )
}