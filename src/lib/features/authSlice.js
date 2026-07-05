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

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const res = await getMeApi();
  return res?.data?.user || res?.user || null;
});

export const login = createAsyncThunk("auth/login", async (data) => {
  const res = await loginApi(data);
  return res?.data?.user || res?.user || null;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutApi();
});

export const signup = createAsyncThunk("auth/signup", async (data) => {
  const res = await signupApi(data);
  return res;
});

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await updateMeApi(payload);
      return res?.data?.user || res?.user;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || "Update failed");
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
      return rejectWithValue(
        err?.response?.data?.message || "Avatar update failed",
      );
    }
  },
);

export const verifyEmailCode = createAsyncThunk(
  "auth/verifyEmailCode",
  async ({ email, code }) => {
    const res = await verifyEmailCodeApi(email, code);
    return res;
  },
);

export const resendEmailCode = createAsyncThunk(
  "auth/resendEmailCode",
  async (email) => {
    const res = await reSendEmailCodeApi(email);
    return res;
  },
);

export const updateMyPassword = createAsyncThunk(
  "auth/updatePassword",
  async (data) => {
    const res = await changePasswordApi(data);
    return res;
  },
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email) => {
    return await forgotPasswordApi(email);
  },
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password, passwordConfirm }) => {
    return await resetPasswordApi(token, password, passwordConfirm);
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: undefined,
    actionLoading: false,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.actionLoading = false;
      })
      .addCase(login.rejected, (state) => {
        state.user = null;
        state.actionLoading = false;
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
      })
      .addCase(signup.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(signup.rejected, (state) => {
        state.actionLoading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.actionLoading = false;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.actionLoading = false;
      })
      .addCase(updateUserAvatar.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.user = action.payload;
        state.actionLoading = false;
      })
      .addCase(updateUserAvatar.rejected, (state) => {
        state.actionLoading = false;
      })
      .addCase(updateMyPassword.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(updateMyPassword.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(updateMyPassword.rejected, (state) => {
        state.actionLoading = false;
      })
      .addCase(verifyEmailCode.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(verifyEmailCode.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(verifyEmailCode.rejected, (state) => {
        state.actionLoading = false;
      })
      .addCase(resendEmailCode.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(resendEmailCode.fulfilled, (state) => {
        state.actionLoading = false;
      })
      .addCase(resendEmailCode.rejected, (state) => {
        state.actionLoading = false;
      });
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
