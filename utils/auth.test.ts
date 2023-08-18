import { vi } from 'vitest';

vi.mock('@clerk/nextjs', () => {
  return {
    auth: () => {
      return {
        userId: '123',
      };
    },
  };
});

vi.mock('./db', () => {
  return {
    prisma: {
      user: {
        findUniqueOrThrow: () => {
          return {
            id: '123',
            clerkId: '123',
          };
        },
      },
    },
  };
});

test('getUserByClerkID', async () => {
  const { getUserByClerkID } = await import('./auth');
  const user = await getUserByClerkID();

  expect(user).toEqual({
    id: '123',
    clerkId: '123',
  });
});
