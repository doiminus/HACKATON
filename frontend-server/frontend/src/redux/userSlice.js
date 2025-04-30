import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    status: 'idle',
    error: null,
    events: [],
    selected_event: null,
    organization: null,
    sports: [],
    venues: [],
    teams: [],
};

// ---------------------- AUTH ----------------------

export const createUser = createAsyncThunk(
    'users/createUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch('/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();
            if (!response.ok) return rejectWithValue(data);
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const login = createAsyncThunk(
    'users/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                await thunkAPI.dispatch(getUser());
                return data;
            }
            return thunkAPI.rejectWithValue(data?.error || 'Login failed');
        } catch (err) {
            return thunkAPI.rejectWithValue('Login error');
        }
    }
);

export const getUser = createAsyncThunk('users/getUser', async (_, thunkAPI) => {
    try {
        const response = await fetch('/api/users/me', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) return data;
        return thunkAPI.rejectWithValue(data);
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to fetch user');
    }
});

export const refreshAuth = createAsyncThunk('users/refresh', async (_, thunkAPI) => {
    try {
        const response = await fetch('/api/users/refresh', {
            method: 'POST',
            headers: { Accept: 'application/json' },
        });

        const data = await response.json();
        if (response.ok) {
            thunkAPI.dispatch(getUser());
            return data;
        }
        return thunkAPI.rejectWithValue(data);
    } catch (err) {
        return thunkAPI.rejectWithValue('Refresh failed');
    }
});

// ---------------------- EVENTS ----------------------

export const getAllEvents = createAsyncThunk('events/getAll', async (_, thunkAPI) => {
    try {
        const res = await fetch('/api/events/latest/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const data = await res.json();
        if (res.ok) return data;
        return thunkAPI.rejectWithValue(data);
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to fetch events');
    }
});

export const getEventById = createAsyncThunk('events/getById', async (payload, thunkAPI) => {

    console.log("-----------------------------------------------");
    console.log(payload);
    console.log("-----------------------------------------------");
    try {
        const res = await fetch(`/api/users/event/${payload}/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (res.ok) return data;
        return thunkAPI.rejectWithValue(data);
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to fetch event');
    }
});

export const createEvent = createAsyncThunk('events/create', async (payload, thunkAPI) => {
    try {
        const res = await fetch('/api/events/create/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.status === 201) return data;
        return thunkAPI.rejectWithValue(data);
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to create event');
    }
});

// ---------------------- ORGANIZATION ----------------------

export const getOrganization = createAsyncThunk('organization/get', async (_, thunkAPI) => {
    try {
        const res = await fetch('/api/users/organization/my/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const data = await res.json();
        if (res.ok) return data;
        return thunkAPI.rejectWithValue(data);
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to fetch organization');
    }
});

// ---------------------- SPORTS / VENUES / TEAMS ----------------------

export const getSports = createAsyncThunk('sports/get', async ({ id }, thunkAPI) => {
    try {
        const res = await fetch(`/api/users/organizations/sports/${id}/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (res.ok) return data;
        return thunkAPI.rejectWithValue(data);
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to fetch sports');
    }
});

export const getVenues = createAsyncThunk('venues/get', async ({ id }, thunkAPI) => {
    try {
        const res = await fetch(`/api/users/organizations/venues/${id}/`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        const data = await res.json();
        if (res.ok) return data;
        return thunkAPI.rejectWithValue(data);
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to fetch venues');
    }
});

export const getTeams = createAsyncThunk('teams/get', async ({ sport_ids }, thunkAPI) => {
    try {
        const res = await fetch('/api/users/teams/by-sport/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sport_ids }),
            credentials: 'include',
        });

        const data = await res.json();
        if (res.ok) return data;
        return thunkAPI.rejectWithValue(data);
    } catch (err) {
        return thunkAPI.rejectWithValue('Failed to fetch teams');
    }
});

// ---------------------- SLICE ----------------------

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        const handlePending = (state) => {
            state.status = 'loading';
            state.error = null;
        };

        const handleFulfilled = (key) => (state, action) => {
            state.status = 'succeeded';
            state[key] = action.payload;
            state.error = null;
        };

        const handleRejected = (key) => (state, action) => {
            state.status = 'failed';
            if (key) state[key] = Array.isArray(state[key]) ? [] : null;
            state.error = action.payload;
        };

        builder
            .addCase(createUser.pending, handlePending)
            .addCase(createUser.fulfilled, handleFulfilled('user'))
            .addCase(createUser.rejected, handleRejected('user'))

            .addCase(login.pending, handlePending)
            .addCase(login.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(login.rejected, handleRejected())

            .addCase(getUser.pending, handlePending)
            .addCase(getUser.fulfilled, handleFulfilled('user'))
            .addCase(getUser.rejected, handleRejected('user'))

            .addCase(createEvent.pending, handlePending)
            .addCase(createEvent.fulfilled, handleFulfilled('events'))
            .addCase(createEvent.rejected, handleRejected('events'))

            .addCase(getAllEvents.pending, handlePending)
            .addCase(getAllEvents.fulfilled, handleFulfilled('events'))
            .addCase(getAllEvents.rejected, handleRejected('events'))

            .addCase(getEventById.pending, handlePending)
            .addCase(getEventById.fulfilled, handleFulfilled('selected_event'))
            .addCase(getEventById.rejected, handleRejected('selected_event'))

            .addCase(getOrganization.pending, handlePending)
            .addCase(getOrganization.fulfilled, handleFulfilled('organization'))
            .addCase(getOrganization.rejected, handleRejected('organization'))

            .addCase(getSports.pending, handlePending)
            .addCase(getSports.fulfilled, handleFulfilled('sports'))
            .addCase(getSports.rejected, handleRejected('sports'))

            .addCase(getVenues.pending, handlePending)
            .addCase(getVenues.fulfilled, handleFulfilled('venues'))
            .addCase(getVenues.rejected, handleRejected('venues'))

            .addCase(getTeams.pending, handlePending)
            .addCase(getTeams.fulfilled, handleFulfilled('teams'))
            .addCase(getTeams.rejected, handleRejected('teams'));
    },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
