import { createSlice, nanoid } from "@reduxjs/toolkit";
import { fetchContacts } from "./operations.js";

const contactsInitialState = {
  contacts: [],
  isLoading: false,
  error: null,
  lastDeletedContact: null,
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: contactsInitialState,

  reducers: {
    addContact: {
      reducer(state, action) {
        state.contacts.push(action.payload);
      },
      prepare(name, number) {
        return { payload: { id: nanoid(8), name, number } };
      },
    },

    deleteContact(state, action) {
      const contact = state.contacts.find(
        c => c.id === action.payload
      );
      state.contacts = state.contacts.filter(
        c => c.id !== action.payload
      );
      state.lastDeletedContact = contact || null;
    },

    restoreContact(state) {
      if (state.lastDeletedContact) {
        state.contacts.push(state.lastDeletedContact);
        state.lastDeletedContact = null;
      }
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.contacts = action.payload;
        console.log(action.payload)
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addContact,
  deleteContact,
  restoreContact,
} = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;