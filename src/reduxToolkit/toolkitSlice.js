import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
        name: "toolkitSlice",
        initialState: {
            searchId: null,
            ticketsInitial: [],
            tickets: []
        },
        reducers: {
            getSearchId: (state, action) => {
                state.searchId = action.payload;
            },
            getTicketsInitial: (state, action ) => {
                state.ticketsInitial = action.payload
            },
            setTickets: (state, action ) => {
                state.tickets = action.payload
            }
        }
    }
)

export default toolkitSlice.reducer
export const {getSearchId, getTicketsInitial, setTickets} = toolkitSlice.actions