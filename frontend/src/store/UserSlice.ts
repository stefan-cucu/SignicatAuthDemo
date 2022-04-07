import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSessionId } from "../app/hooks";

// Interface for the user slice
export interface User {
    providerId: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    sessionId: string;
    loaded: boolean;
}

// Initial state for the user slice
const initialState: User = {
    providerId: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    sessionId: "",
    loaded: false,
}

// Async thunk for fetching the user using the session id
export const fetchUser = createAsyncThunk('user/fetchUser', async (sessionId: string) => {
    const response = await fetch(`http://localhost:8080/api/session/${sessionId}`); // TO DO: Change development server url
    const user = await response.json();
    return {
        sessionId: sessionId,
        ...user.identity,
    };
});

// Configure the user slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.providerId = action.payload.providerId;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.dateOfBirth = action.payload.dateOfBirth;
            state.sessionId = action.payload.sessionId;
            state.loaded = true;
        },
        logOut: (state) => {
            state.providerId = "";
            state.firstName = "";
            state.lastName = "";
            state.dateOfBirth = "";
            state.sessionId = "";
            state.loaded = false;
        },
    },
    extraReducers: {
        [fetchUser.fulfilled.type]: (state, action: PayloadAction<User>) => {
            state.providerId = action.payload.providerId;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.dateOfBirth = action.payload.dateOfBirth;
            state.loaded = true;
        }
    }
});

export const { setUser, logOut } = userSlice.actions;

export const getUser = (state : any) => state.user;

export default userSlice.reducer;