import { configureStore } from '@reduxjs/toolkit';
import cropReducer from './cropSlice';
import fieldsReducer from './fieldSlice.js';
import staffReducer from './staffSlice.js';
import equipmentReducer from './equipmentSlice.js';
import logsReducer from './logSlice.js';

const store = configureStore({
    reducer: {
        crops: cropReducer,
        fields: fieldsReducer(),
        staff: staffReducer(),
        equipment: equipmentReducer,
        logs: logsReducer,
    },
});

export default store;
