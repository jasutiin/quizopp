export interface Session {
  id: string;
  userId: number;
  expiresAt: Date;
}

export interface GoogleProfile {
  id?: string;
  displayName?: string;
  name?: { familyName?: string; givenName?: string };
  emails?: GoogleEmail[];
}

export interface GoogleEmail {
  value?: string;
}

export type DoneCallback = (
  error: Error | null,
  user?: { session: Session; sessionToken: string }
) => void;
