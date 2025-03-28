
import { KALSHI_API_URL } from './config';

// Authentication status
export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  displayName: string | null;
  email: string | null;
  apiKey: string | null;
  lastLogin: Date | null;
}

// Initial auth state
const initialAuthState: AuthState = {
  isAuthenticated: false,
  username: null,
  displayName: null,
  email: null,
  apiKey: null,
  lastLogin: null
};

// Current auth state
let authState = { ...initialAuthState };

// Function to update auth state
const updateAuthState = (newState: Partial<AuthState>) => {
  authState = { ...authState, ...newState };
  
  // Notify listeners
  authListeners.forEach(listener => listener(authState));
  
  // Save to localStorage if in browser
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('kalshi_auth', JSON.stringify({
        username: authState.username,
        displayName: authState.displayName,
        email: authState.email,
        apiKey: authState.apiKey,
        lastLogin: authState.lastLogin ? authState.lastLogin.toISOString() : null,
        isAuthenticated: authState.isAuthenticated
      }));
    } catch (error) {
      console.error('Failed to save auth state to localStorage:', error);
    }
  }
};

// Load saved auth state from localStorage
const loadSavedAuthState = () => {
  if (typeof window !== 'undefined') {
    try {
      const savedAuth = localStorage.getItem('kalshi_auth');
      if (savedAuth) {
        const parsed = JSON.parse(savedAuth);
        updateAuthState({
          ...parsed,
          lastLogin: parsed.lastLogin ? new Date(parsed.lastLogin) : null,
          isAuthenticated: !!parsed.apiKey
        });
      }
    } catch (error) {
      console.error('Failed to load auth state from localStorage:', error);
    }
  }
};

// Call this on initial load
loadSavedAuthState();

// Auth state listeners
const authListeners: Array<(state: AuthState) => void> = [];

// Subscribe to auth state changes
export const onAuthStateChanged = (callback: (state: AuthState) => void) => {
  authListeners.push(callback);
  
  // Call immediately with current state
  callback(authState);
  
  // Return unsubscribe function
  return () => {
    const index = authListeners.indexOf(callback);
    if (index !== -1) {
      authListeners.splice(index, 1);
    }
  };
};

// Login with username and password
export const login = async (username: string, password: string): Promise<boolean> => {
  try {
    const response = await fetch(`${KALSHI_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: username,
        password
      })
    });
    
    if (!response.ok) {
      throw new Error(`Login failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Update auth state
    updateAuthState({
      isAuthenticated: true,
      username,
      displayName: data.user?.name || username,
      email: data.user?.email || username,
      apiKey: data.token,
      lastLogin: new Date()
    });
    
    return true;
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

// Login with API key
export const loginWithApiKey = (apiKey: string, username?: string): boolean => {
  try {
    updateAuthState({
      isAuthenticated: true,
      username: username || 'User',
      displayName: username || 'User',
      email: null,
      apiKey,
      lastLogin: new Date()
    });
    
    return true;
  } catch (error) {
    console.error('Login with API key error:', error);
    return false;
  }
};

// Logout
export const logout = (): void => {
  updateAuthState({ ...initialAuthState });
  
  // Clear from localStorage
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('kalshi_auth');
    } catch (error) {
      console.error('Failed to clear auth state from localStorage:', error);
    }
  }
};

// Get current auth state
export const getAuthState = (): AuthState => {
  return { ...authState };
};

// Get API key
export const getApiKey = (): string | null => {
  return authState.apiKey;
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return authState.isAuthenticated;
};
