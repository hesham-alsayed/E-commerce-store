import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login as loginApi,
  logout as logoutApi,
  signup as signupApi,
  getMe as getMeApi,
  updateMe as updateMeApi,
  updateAvatar as updateAvatarApi,
  changePassword as changePasswordApi,
  verifyEmailCode as verifyEmailCodeApi,
  reSendEmailCode as reSendEmailCodeApi,
  forgotPassword as forgotPasswordApi,
  resetPassword as resetPasswordApi,
} from "@/api/authApi";

export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const res = await getMeApi();
    return res?.data?.user || res?.user || null;
  } catch (err) {
    return rejectWithValue(err?.message || err || "Failed to fetch user");
  }
});

export const login = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
  try {
    const body = await loginApi(data);

    if (!document.cookie.includes("jwt=") && body?.token) {
      document.cookie = `jwt=${body.token}; path=/; max-age=604800; SameSite=Lax`;
    }

    return body?.data?.user || body?.user || null;
  } catch (err) {
    return rejectWithValue(err?.message || err || "Login failed");
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutApi();
});

export const signup = createAsyncThunk("auth/signup", async (data, { rejectWithValue }) => {
  try {
    const body = await signupApi(data);

    if (!document.cookie.includes("jwt=") && body?.token) {
      document.cookie = `jwt=${body.token}; path=/; max-age=604800; SameSite=Lax`;
    }

    return body;
  } catch (err) {
    return rejectWithValue(err?.message || err || "Signup failed");
  }
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updateMeApi(payload);
      return res?.data?.user || res?.user;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Update failed");
    }
  },
);

export const updateUserAvatar = createAsyncThunk(
  "auth/updateAvatar",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const res = await updateAvatarApi(formData);
      return res?.data?.user || res?.user;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Avatar update failed");
    }
  },
);

export const verifyEmailCode = createAsyncThunk(
  "auth/verifyEmailCode",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const body = await verifyEmailCodeApi(email, code);

      if (!document.cookie.includes("jwt=") && body?.token) {
        document.cookie = `jwt=${body.token}; path=/; max-age=604800; SameSite=Lax`;
      }

      return body;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Verification failed");
    }
  },
);

export const resendEmailCode = createAsyncThunk(
  "auth/resendEmailCode",
  async (email, { rejectWithValue }) => {
    try {
      const res = await reSendEmailCodeApi(email);
      return res;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Resend failed");
    }
  },
);

export const updateMyPassword = createAsyncThunk(
  "auth/updatePassword",
  async (data, { rejectWithValue }) => {
    try {
      const res = await changePasswordApi(data);
      return res;
    } catch (err) {
      return rejectWithValue(err?.message || err || "Password update failed");
    }
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      return await forgotPasswordApi(email);
    } catch (err) {
      return rejectWithValue(err?.message || err || "Failed to send reset email");
    }
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password, passwordConfirm }, { rejectWithValue }) => {
    try {
      return await resetPasswordApi(token, password, passwordConfirm);
    } catch (err) {
      return rejectWithValue(err?.message || err || "Password reset failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    actionLoading: false,
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.user = null;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.actionLoading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.actionLoading = false;
      })
      .addCase(logout.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(signup.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.actionLoading = false;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.actionLoading = false;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUserAvatar.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.user = action.payload;
        state.actionLoading = false;
        state.error = null;
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(updateMyPassword.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateMyPassword.fulfilled, (state) => {
        state.actionLoading = false;
        state.error = null;
      })
      .addCase(updateMyPassword.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(verifyEmailCode.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(verifyEmailCode.fulfilled, (state) => {
        state.actionLoading = false;
        state.error = null;
      })
      .addCase(verifyEmailCode.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(resendEmailCode.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(resendEmailCode.fulfilled, (state) => {
        state.actionLoading = false;
        state.error = null;
      })
      .addCase(resendEmailCode.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, clearUser, clearError } = authSlice.actions;
export default authSlice.reducer;
