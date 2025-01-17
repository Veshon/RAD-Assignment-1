import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Crop {
    code: string;
    commonName: string;
    scientificName: string;
    category: string;
    season: string;
    fieldCode: string;
}

interface CropState {
    items: Crop[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const API_URL = 'http://localhost:5050/fcw/api/v1/crops';

export const fetchCrops = createAsyncThunk<Crop[], string>(
    'crops/fetchCrops',
        async (token) => {
            const response = await axios.get(API_URL, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        }
);

const initialState: CropState = {
    items: [],
    status: 'idle',
    error: null,
};

const cropSlice = createSlice({
    name: 'crops',
    initialState,
    reducers: {
        addCrop: (state, action: PayloadAction<Crop>) => {
            state.items.push(action.payload);
        },
        deleteCrop: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((crop) => crop.code !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCrops.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCrops.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCrops.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to fetch crops.';
            });
    },
});

export const { addCrop, deleteCrop } = cropSlice.actions;
export default cropSlice.reducer;
