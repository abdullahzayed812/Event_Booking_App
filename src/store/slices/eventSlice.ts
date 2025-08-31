import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../api/apiSlice';

interface EventState {
  selectedEvent: Event | null;
  registeredEvents: string[];
}

const initialState: EventState = {
  selectedEvent: null,
  registeredEvents: [],
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setSelectedEvent: (state, action: PayloadAction<Event>) => {
      state.selectedEvent = action.payload;
    },
    addRegisteredEvent: (state, action: PayloadAction<string>) => {
      if (!state.registeredEvents.includes(action.payload)) {
        state.registeredEvents.push(action.payload);
      }
    },
    removeRegisteredEvent: (state, action: PayloadAction<string>) => {
      state.registeredEvents = state.registeredEvents.filter(
        id => id !== action.payload,
      );
    },
  },
});

export const { setSelectedEvent, addRegisteredEvent, removeRegisteredEvent } =
  eventSlice.actions;
export default eventSlice.reducer;
