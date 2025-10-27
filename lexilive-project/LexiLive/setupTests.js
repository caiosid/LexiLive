import 'whatwg-fetch'; // polyfill fetch se necessário

// Mock global do fetch
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});