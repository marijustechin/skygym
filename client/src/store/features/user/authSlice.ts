import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../../services/AuthService';
import { RootState } from '../../store';
import { jwtDecode } from 'jwt-decode';
import { IAuth } from '../../../types/user';
import HelperService from '../../../services/HelperService';

interface AuthState {
  user: IAuth;
  accessToken: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// tikrinam ar tokena geras (nepasibaiges) `true/false`
const isTokenValid = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // sekundes -> milisekundes
  } catch (error: unknown) {
    console.log(error);
    return false; // Neteisingas tokenas
  }
};

// Atstatom useri is local storage **with accessToken**
const storedToken = localStorage.getItem('accessToken');
let restoredUser: IAuth = { id: null, role: null };
let restoredAccessToken: string | null = null;

if (storedToken && isTokenValid(storedToken)) {
  const { id, role } = jwtDecode<{
    id: string;
    role: string;
    balance: number;
  }>(storedToken);
  restoredUser = { id, role };
  restoredAccessToken = storedToken;
}

const initialState: AuthState = {
  user: restoredUser,
  accessToken: restoredAccessToken, // Ar verta sita tokena laikyti globaliam state???
  status: 'idle',
  error: null,
};

// atkuriam is local storage
export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { rejectWithValue }) => {
    try {
      // Get token from localStorage
      const oldToken = localStorage.getItem('accessToken');

      if (oldToken && isTokenValid(oldToken)) {
        const { id, role, balance } = jwtDecode<{
          id: string;
          role: string;
          balance: number;
        }>(oldToken);
        return { accessToken: oldToken, user: { id, role, balance } };
      } else if (oldToken) {
        const newToken = await AuthService.refresh();
        if (!newToken) throw new Error('Sesija baigėsi...');

        localStorage.setItem('accessToken', newToken);
        const { id, role, balance } = jwtDecode<{
          id: string;
          role: string;
          balance: number;
        }>(newToken);
        return { accessToken: newToken, user: { id, role, balance } };
      } else {
        throw new Error('Session expired. Please login.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue('Session expired. Please login.');
    }
  }
);

// Login ir dedam accessToken i Redux
export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('accessToken', response.accessToken);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(HelperService.errorToString(error));
    }
  }
);

// Atjumgiam
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await AuthService.logout();
      localStorage.removeItem('accessToken');
    } catch (error: unknown) {
      return rejectWithValue(HelperService.errorToString(error));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.user = { id: null, role: null };
      state.accessToken = null; // Pasalinam tokena
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accessToken = action.payload.accessToken; // dedam tokena i ridaksa
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = 'idle';
        state.user = { id: null, role: null };
        state.accessToken = null; // pasalinam tokena
        state.error = null;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken; // Issaugom atstatyta tokena
        state.user = action.payload.user;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = { id: null, role: null };
        state.accessToken = null;
        localStorage.removeItem('accessToken');
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
