import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'teacher' | 'student';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isTeacher: boolean;
  isStudent: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';

  return (
    <UserContext.Provider value={{ user, setUser, isTeacher, isStudent }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
