import mockData from '../data/mockData.json';
import {
  Event,
  User,
  Registration,
  LoginRequest,
  SignUpRequest,
} from '../store/api/apiSlice';

// Simulate API delay
const delay = (ms: number): Promise<void> =>
  new Promise<void>(resolve => setTimeout(() => resolve(), ms));

class MockApiService {
  private events: Event[];
  private users: any[];
  private registrations: Registration[];

  constructor() {
    // Deep clone to avoid mutating the original mock data
    this.events = JSON.parse(JSON.stringify(mockData.events));
    this.users = JSON.parse(JSON.stringify(mockData.users));
    this.registrations = JSON.parse(JSON.stringify(mockData.registrations));
  }

  // Reset data to original state (useful for testing)
  resetData(): void {
    this.events = JSON.parse(JSON.stringify(mockData.events));
    this.users = JSON.parse(JSON.stringify(mockData.users));
    this.registrations = JSON.parse(JSON.stringify(mockData.registrations));
  }

  // Authentication
  async login(credentials: LoginRequest): Promise<User> {
    await delay(Math.random() * 800 + 200); // Random delay 200-1000ms

    const user = this.users.find(
      u => u.email === credentials.email && u.password === credentials.password,
    );

    if (!user) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      token: `mock-token-${user.id}-${Date.now()}`,
    };
  }

  async signUp(userData: SignUpRequest): Promise<User> {
    await delay(Math.random() * 800 + 200);

    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const newUser = {
      id: `user${Date.now()}`, // More unique ID
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    this.users.push(newUser);

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      token: `mock-token-${newUser.id}-${Date.now()}`,
    };
  }

  // Events
  async getEvents(): Promise<Event[]> {
    await delay(Math.random() * 600 + 200);
    return [...this.events]; // Return a copy
  }

  async getEventById(id: string): Promise<Event> {
    await delay(Math.random() * 400 + 100);
    const event = this.events.find(e => e.id === id);
    if (!event) {
      throw new Error('Event not found');
    }
    return { ...event }; // Return a copy
  }

  // Registrations
  async registerForEvent(
    eventId: string,
    userId: string,
  ): Promise<Registration> {
    await delay(Math.random() * 800 + 200);

    const existingRegistration = this.registrations.find(
      r => r.eventId === eventId && r.userId === userId,
    );

    if (existingRegistration) {
      throw new Error('Already registered for this event');
    }

    const event = this.events.find(e => e.id === eventId);
    if (!event || event.availableSpots <= 0) {
      throw new Error('No available spots');
    }

    const newRegistration: Registration = {
      id: `reg${Date.now()}`,
      userId,
      eventId,
      registrationDate: new Date().toISOString(),
    };

    this.registrations.push(newRegistration);
    event.availableSpots -= 1;

    return newRegistration;
  }

  async getUserRegistrations(userId: string): Promise<Registration[]> {
    await delay(Math.random() * 500 + 100);
    return this.registrations
      .filter(r => r.userId === userId)
      .map(r => ({ ...r })); // Return copies
  }

  // Additional utility methods
  async getAllUsers(): Promise<Omit<User, 'token'>[]> {
    await delay(Math.random() * 400 + 100);
    return this.users.map(u => ({
      id: u.id,
      email: u.email,
      name: u.name,
    }));
  }

  async getAllRegistrations(): Promise<Registration[]> {
    await delay(Math.random() * 400 + 100);
    return [...this.registrations];
  }
}

export const mockApiService = new MockApiService();
