import {createSlice} from '@reduxjs/toolkit';

const initialState = {};

// console.log('+++++++++??????>>>>', action.payload);
const auth = createSlice({
  name: 'update',
  initialState,
  reducers: {
    UpdateData: (state, action) => {
      state.selectedData = action.payload;
    },
    UpdatedCount: (state, action) => {
      const updatedcount = action.payload;
      const oringinaldata = state.selectedData;
      const a = oringinaldata.map(item => {
        const b = updatedcount.find(updated => updated.id === item.id);
        if (b) {
          return {...item, count: b.count};
        }
        return item;
      });
      state.updatecount = a;
    },
  },
});

export const {UpdateData, UpdatedCount} = auth.actions;
export default auth.reducer;
