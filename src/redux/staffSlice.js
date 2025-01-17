import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchStaff = createAsyncThunk('staff/fetchStaff', async () => {
    const response = await axios.get('/api/v1/staff'); // Adjust URL
    return response.data;
});

export const staffSlice = createSlice({
    name: 'staff',
    initialState: {
        staffList: [],
        fields: [],
        vehicles: [],
    },
    reducers: {
        addStaff: (state, action) => {
            state.staffList.push(action.payload);
        },
        updateStaff: (state, action) => {
            const index = state.staffList.findIndex((staff) => staff.id === action.payload.id);
            if (index !== -1) {
                state.staffList[index] = action.payload;
            }
        },
        deleteStaff: (state, action) => {
            state.staffList = state.staffList.filter((staff) => staff.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchStaff.fulfilled, (state, action) => {
            state.staffList = action.payload;
        });
    },
});

export const { addStaff, updateStaff, deleteStaff } = staffSlice.actions;

export default staffSlice.reducer;
