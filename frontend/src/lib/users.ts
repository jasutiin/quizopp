import { User } from '@/lib/types';

export async function getUserByUsername(username: string) {
  const user1: User = {
    name: 'John',
    username: 'JohnRules123',
    country: 'Canada',
    description: 'I am so cool',
    wins: 20,
    draws: 3,
    losses: 4,
  };

  const user2: User = {
    name: 'Jane',
    username: 'JaneRocks456',
    country: 'USA',
    description: 'I am more cool',
    wins: 30,
    draws: 5,
    losses: 9,
  };

  const user3: User = {
    name: 'Justine',
    username: 'jasutiin',
    country: 'Philippines',
    description: 'Six Seven',
    wins: 67,
    draws: 0,
    losses: 0,
  };

  const users = [user1, user2, user3];

  for (const user of users) {
    if (user.username == username) {
      return user;
    }
  }

  return null;
}
