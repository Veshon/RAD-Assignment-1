import { createSlice } from '@reduxjs/toolkit';

export const logsSlice = createSlice({
    name: 'logs',
    initialState: [],
    reducers: {
        setLogs: (state, action) => action.payload,
        clearLogs: () => [],
    },
});

export const { setLogs, clearLogs } = logsSlice.actions;
export default logsSlice.reducer;
