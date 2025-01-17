import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    fields: [],
    selectedField: null,
};

const fieldSlice = createSlice({
    name: 'fields',
    initialState,
    reducers: {
        setFields: (state, action) => {
            state.fields = action.payload;
        },
        setSelectedField: (state, action) => {
            state.selectedField = action.payload;
        },
    },
});

export const { setFields, setSelectedField } = fieldSlice.actions;
export default fieldSlice.reducer;
