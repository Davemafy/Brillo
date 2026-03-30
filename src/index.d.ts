interface RouterContext {
  auth: { isAuthenticated: boolean; user: string | null }
  queryClient: QueryClient
}

interface SearchParams {
  redirect?: string;
};

interface HistoryState {
  returnTo?: string;
  from?: string;
}

interface LoginState {
  returnTo?: string;
}

interface AppUser {
  id: string;
  email: string;
  name: string;
  avatar: string;
  provider: 'google' | 'email';
}


interface Course {
  id: string;
  created_at: string;
  user_id: string;
  img: string;
  title: string;
  instructor: string;
  subtitle: string;
  duration: sting;
  rating: number;
  progress: number;
}

interface Note {
  id: string;
  course_id: string;
  title: string;
  course_title: string;
  created_at: string;
  description: string;
  duration: string;
  img: string;
}

type NewCourse = Omit<Course, 'id' | 'created_at'>;
type NewNote = Omit<Note, 'id' | 'created_at'>;

type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeType {
  current: ThemeMode;
  themes: {
    light: {
      style: string;
    };
    dark: {
      style: string;
    };
    system: {
      style: string;
    };
  };
}
