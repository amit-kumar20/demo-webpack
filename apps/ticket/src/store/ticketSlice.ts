import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Ticket = {
  id: number;
  title: string;
  category: string;
  status: "Open" | "Closed" | "Pending";
  program: string;
  createdAt: string;
};

interface TicketState {
  tickets: Ticket[];
}

const initialState: TicketState = {
  tickets: [],
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setTickets(state, action: PayloadAction<Ticket[]>) {
      state.tickets = action.payload;
    },
    addTicket(state, action: PayloadAction<Ticket>) {
      state.tickets.push(action.payload);
    },
    deleteTicket(state, action: PayloadAction<number>) {
      state.tickets = state.tickets.filter((t) => t.id !== action.payload);
    },
  },
});

export const { setTickets, addTicket, deleteTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
