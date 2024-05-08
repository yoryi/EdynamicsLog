import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {MediaCamera} from '../../types';

const initialState = {
  listImage: [],
};

const photoQSlice = createSlice({
  name: 'photoQ',
  initialState,
  reducers: {
    uploadImage(state, action: PayloadAction<MediaCamera>) {
      state.listImage.push(action.payload);
    },
    updateObject(state, action) {
      const {id, newState} = action.payload;
      const objectToUpdate: any = state.listImage.find(
        obj => obj?.nameMedia === id,
      );
      if (objectToUpdate) {
        Object.assign(objectToUpdate, newState);
      }
    },
  },
});

export const {uploadImage, updateObject} = photoQSlice.actions;
export default photoQSlice.reducer;
