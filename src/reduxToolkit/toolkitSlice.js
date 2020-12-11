import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const setTicketsInitial = createAsyncThunk(
    'tickets/setTicketsInitial',
    async (searchId, { getState, requestId }) => {
        const response = await axios.get('https://front-test.beta.aviasales.ru/tickets?searchId=' + searchId)
        return response?.data?.tickets
    }
)

const toolkitSlice = createSlice({

        name: "toolkitSlice",
        initialState: {
            ticketsInitial: [],
            tickets: [],
            loading: true
        },

        reducers: {

            setTickets(state, action) {
                console.log("24 action.payload")
                console.log(action.payload)
                state.tickets = action.payload.sort((a,b) => a.price - b.price);
            },

        },

        extraReducers: (builder) => {
            builder.addCase(setTicketsInitial.pending, (state, action) => {
                state.loading = true
            })
            builder.addCase(setTicketsInitial.fulfilled, (state, action) => {
                state.ticketsInitial = action.payload.sort((a, b) => a.price - b.price)
                state.tickets = state.ticketsInitial
                state.loading = false
            })
            builder.addCase(setTicketsInitial.rejected, (state, action) => {
                const { requestId } = action.meta
                state.error = action.error
                state.currentRequestId = undefined
            })
        }
})

export default toolkitSlice.reducer
export const {setTickets} = toolkitSlice.actions
