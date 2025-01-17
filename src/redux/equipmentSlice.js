import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    equipment: {},
    equipmentList: [],
};

const equipmentSlice = createSlice({
    name: 'equipment',
    initialState,
    reducers: {
        setEquipment: (state, action) => {
            state.equipment = action.payload;
        },
        setEquipmentList: (state, action) => {
            state.equipmentList = action.payload;
        },
    },
});

export const { setEquipment, setEquipmentList } = equipmentSlice.actions;
export default equipmentSlice.reducer;
