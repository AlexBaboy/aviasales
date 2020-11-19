import {createSlice} from "redux-toolkit";

const toolkitSlice = createSlice({
        name: "toolkitSlice",
        initialState: {
            searchId: null
        },
        reducers: {
            getSearchId: (state, action) => {
                state.searchId = action.payload;
                console.log("state.searchId")
                console.log(state.searchId)
            },
        }
    }
)

export default toolkitSlice.reducer
export const {getSearchId} = toolkitSlice.actions