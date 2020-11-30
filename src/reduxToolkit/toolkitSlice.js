import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
        name: "toolkitSlice",
        initialState: {
            tickets: []
        },
        reducers: {
            getSearchId: (state, action) => {
                state.searchId = action.payload;
            },
            setTicketsReducer: (state, action ) => {
                state.tickets = action.payload.sort((a,b) => a.price - b.price);
                console.log("14 state.tickets ")
                console.log(state.tickets)
            }
        }
    }
)

export default toolkitSlice.reducer
export const {getSearchId, setTicketsReducer} = toolkitSlice.actions