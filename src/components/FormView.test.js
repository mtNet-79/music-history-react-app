import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import faker from 'faker';
import MyComponent from './MyComponent';

const server = setupServer(
  rest.get('/composers', (req, res, ctx) => {
    const composers = [
      { id: 1, name: faker.name.findName(), birthdate: faker.date.past(), deathdate: faker.date.past(), nationality: faker.address.country() },
      { id: 2, name: faker.name.findName(), birthdate: faker.date.past(), deathdate: faker.date.past(), nationality: faker.address.country() },
      // ...etc
    ];
    return res(ctx.json(composers));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('renders composer data', async () => {
  render(<MyComponent />);
  const composerName = await screen.findByText('Loading...');
  expect(composerName).toBeInTheDocument();
  const actualComposerName = await screen.findByText(server.responses[0].body[0].name);
  expect(actualComposerName).toBeInTheDocument();
});