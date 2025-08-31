import { createApi } from '@reduxjs/toolkit/query/react';
import mockData from '../../data/mockData.json';

// Types
export interface User {
  id: string;
  email: string;
  name: string;
  token?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  speakers: string[];
  price: number;
  image: string;
  capacity: number;
  availableSpots: number;
}

export interface Registration {
  id: string;
  userId: string;
  eventId: string;
  registrationDate: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

// In-memory data that starts with mock data
let events: Event[] = [...mockData.events];
let users: any[] = [...mockData.users];
let registrations: Registration[] = [...mockData.registrations];

// Helper function to simulate API delay
const delay = (ms: number = 500) =>
  new Promise(resolve => setTimeout(() => resolve(''), ms));

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: async () => ({ data: {} }), // Dummy base query since we use queryFn
  tagTypes: ['Event', 'User', 'Registration'],
  endpoints: builder => ({
    // Authentication
    login: builder.mutation<User, LoginRequest>({
      queryFn: async credentials => {
        await delay(800);

        const user = users.find(
          u =>
            u.email === credentials.email &&
            u.password === credentials.password,
        );

        if (!user) {
          return { error: { status: 401, data: 'Invalid credentials' } };
        }

        return {
          data: {
            id: user.id,
            email: user.email,
            name: user.name,
            token: `mock-token-${user.id}-${Date.now()}`,
          },
        };
      },
    }),

    signUp: builder.mutation<User, SignUpRequest>({
      queryFn: async userData => {
        await delay(800);

        // Check if user already exists
        const existingUser = users.find(u => u.email === userData.email);
        if (existingUser) {
          return { error: { status: 400, data: 'User already exists' } };
        }

        const newUser = {
          id: `user${Date.now()}`,
          name: userData.name,
          email: userData.email,
          password: userData.password,
        };

        users.push(newUser);

        return {
          data: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            token: `mock-token-${newUser.id}-${Date.now()}`,
          },
        };
      },
    }),

    // Events
    getEvents: builder.query<Event[], void>({
      queryFn: async () => {
        await delay(600);
        return { data: [...events] };
      },
      providesTags: ['Event'],
    }),

    getEventById: builder.query<Event, string>({
      queryFn: async id => {
        await delay(400);

        const event = events.find(e => e.id === id);
        if (!event) {
          return { error: { status: 404, data: 'Event not found' } };
        }

        return { data: { ...event } };
      },
      providesTags: (result, error, id) => [{ type: 'Event', id }],
    }),

    // Registrations
    registerForEvent: builder.mutation<
      Registration,
      { eventId: string; userId: string }
    >({
      queryFn: async ({ eventId, userId }) => {
        await delay(700);

        // Check if already registered
        const existingRegistration = registrations.find(
          r => r.eventId === eventId && r.userId === userId,
        );

        if (existingRegistration) {
          return {
            error: { status: 400, data: 'Already registered for this event' },
          };
        }

        // Check if event exists and has available spots
        const event = events.find(e => e.id === eventId);
        if (!event) {
          return { error: { status: 404, data: 'Event not found' } };
        }

        if (event.availableSpots <= 0) {
          return { error: { status: 400, data: 'No available spots' } };
        }

        const newRegistration: Registration = {
          id: `reg${Date.now()}`,
          userId,
          eventId,
          registrationDate: new Date().toISOString(),
        };

        registrations.push(newRegistration);

        // Update available spots
        event.availableSpots -= 1;

        return { data: newRegistration };
      },
      invalidatesTags: ['Event', 'Registration'],
    }),

    getUserRegistrations: builder.query<Registration[], string>({
      queryFn: async userId => {
        await delay(500);

        const userRegistrations = registrations.filter(
          r => r.userId === userId,
        );
        return { data: [...userRegistrations] };
      },
      providesTags: ['Registration'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useGetEventsQuery,
  useGetEventByIdQuery,
  useRegisterForEventMutation,
  useGetUserRegistrationsQuery,
} = apiSlice;
