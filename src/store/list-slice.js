import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: 'list',
  initialState: {
    items: []
  },
  reducers: {
    addItem(state, action){
      const newItem = action.payload;
      state.items.push(newItem);
    },
    updateItemByIndex(state,action){
      const {index, newItem} = action.payload;
      state.items[index] = newItem;
    },
    clearList(state){
      state.items = [];
    }
   
  }
})


export const listActions = listSlice.actions;

export default listSlice;
