import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
        name: "toolkitSlice",
        initialState: {
            ticketsInitial: [],
            tickets: []
        },
        reducers: {
            setTicketsInitial: (state, action ) => {
                state.ticketsInitial = action.payload.sort((a,b) => a.price - b.price);
            },
            setTickets: (state, action ) => {
                state.tickets = action.payload.sort((a,b) => a.price - b.price);
            }
        }
    }
)

export default toolkitSlice.reducer
export const {setTicketsInitial, setTickets} = toolkitSlice.actions