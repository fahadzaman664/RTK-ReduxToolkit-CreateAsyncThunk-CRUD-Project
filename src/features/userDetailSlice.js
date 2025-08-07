import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk action
export const createuser = createAsyncThunk(
    "createuser",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://689478cebe3700414e135109.mockapi.io/CRUD", formData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);



// Async thunk action
export const fetchusers = createAsyncThunk(
    "fetchuser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("https://689478cebe3700414e135109.mockapi.io/CRUD");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunk action
export const updateuser = createAsyncThunk(
    "updateuser",
    async ({ id, userData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`https://689478cebe3700414e135109.mockapi.io/CRUD/${id}`, userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Async thunk action
export const deleteUser = createAsyncThunk(
    "deleteuser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`https://689478cebe3700414e135109.mockapi.io/CRUD/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


// Slice
export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
        userAdded: false,
        userUpdated: false
    },
    reducers: {
        resetFlags: (state) => {
            state.userUpdated = false;
            state.userAdded = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createuser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createuser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createuser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            .addCase(fetchusers.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchusers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;

            })
            .addCase(fetchusers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload

            })
            .addCase(updateuser.pending, (state, action) => {
                // state.loading = true;
                state.error = null;
            })
            .addCase(updateuser.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.users.findIndex((u) => u.id === action.payload.id)

                if (index !== -1) {
                    state.users[index] = action.payload
                }
                state.userUpdated = true;
            })
            .addCase(updateuser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
            .addCase(deleteUser.pending, (state, action) => {
                // state.loading = true;
                state.error = null;
            })

            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.filter((u) => u.id !== action.payload.id)
            })
             .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
});

export const { resetFlags } = userDetail.actions;

export default userDetail.reducer;
