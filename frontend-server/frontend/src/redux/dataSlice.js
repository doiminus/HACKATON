import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    organizations: [],
    events: [],
    selected_event: 0,
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addOrganization: (state, action) => {
            state.organizations.push(action.payload);
        },
        addEvent: (state, action) => {
            state.events.push(action.payload);
        },
        setSelectedEvent: (state, action) => {
            state.selected_event = action.payload;
        },
    },
});


export const { addOrganization, addEvent, setSelectedEvent } = dataSlice.actions;
export default dataSlice.reducer;
