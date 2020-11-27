import {createSlice} from "@reduxjs/toolkit";

const toolkitSlice = createSlice({
        name: "toolkitSlice",
        initialState: {
            searchId: null,
            ticketsInitial: []
        },
        reducers: {
            getSearchId: (state, action) => {
                state.searchId = action.payload;
            },
            getTicketsInitial: (state, action) => {
                console.log("toolkitSlice 14")
                state.ticketsInitial = action.payload
            }
        }
    }
)

export default toolkitSlice.reducer
export const {getSearchId, getTicketsInitial} = toolkitSlice.actions