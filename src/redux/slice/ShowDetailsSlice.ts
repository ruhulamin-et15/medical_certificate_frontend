import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface ShowDetailsSlice {
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  sex?: string;
  email?: string;
  phone?: string;
}

const initialState: ShowDetailsSlice = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  sex: "",
  email: "",
  phone: "",
};

// Create a slice for managing live updates
const ShowDetails = createSlice({
  name: "showDetails",
  initialState,
  reducers: {
    updateValue: (state, action: PayloadAction<ShowDetailsSlice>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.sex = action.payload.sex;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
    removeValue: () => {
      return initialState;
    },
  },
});

// Export actions
export const { updateValue, removeValue } = ShowDetails.actions;

export default ShowDetails.reducer;
