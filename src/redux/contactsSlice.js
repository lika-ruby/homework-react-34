import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContactsApi,
  delContactsApi,
  restoreContactsApi,
} from "./operations.js";

const initialState = {
  contacts: [],
  isLoading: false,
  error: null,
  lastDeletedContact: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,

  reducers: {
    setLastDeleted(state, action) {
      state.lastDeletedContact = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addContactsApi.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(delContactsApi.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (c) => c.id !== action.payload.id
        );
      })
      .addCase(restoreContactsApi.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.lastDeletedContact = null;
      });
  },
});

export const { setLastDeleted, clearLastDeleted } =
  contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;