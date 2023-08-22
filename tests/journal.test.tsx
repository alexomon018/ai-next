import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import Page from '../app/(dashboard)/journal/page';
import { prisma } from '../utils/__mocks__/db';

type ClerckProps = {
  children: React.ReactNode;
};

vi.mock('@clerk/nextjs', () => {
  // Create an mockedFunctions object to match the functions we are importing from the @nextjs/clerk package in the ClerkComponent component.
  const mockedFunctions = {
    auth: () =>
      new Promise((resolve) =>
        resolve({ userId: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC' })
      ),
    ClerkProvider: ({ children }: ClerckProps) => <div>{children}</div>,
    useUser: () => ({
      isSignedIn: true,
      user: {
        id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
        fullName: 'Charles Harris',
      },
    }),
  };

  return mockedFunctions;
});

vi.mock('../utils/db');

vi.mock('../utils/auth', () => {
  const mockedFunctions = {
    getUserByClerkID: () =>
      new Promise((resolve) =>
        resolve({
          id: 'user_2NNEqL2nrIRdJ194ndJqAHwEfxC',
          fullName: 'Charles Harris',
        })
      ),
  };

  return mockedFunctions;
});

vi.mock('next/navigation', () => {
  const mockedFunctions = {
    useRouter: () => ({
      push: () => {},
    }),
  };

  return mockedFunctions;
});

test(`Journal`, async () => {
  render(await Page());
  expect(screen.getByText('Journal')).toBeTruthy();
});

test('Give back entries', async () => {});
