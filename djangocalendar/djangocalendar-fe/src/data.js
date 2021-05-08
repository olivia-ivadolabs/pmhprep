// @flow
import { colors } from '@atlaskit/theme';

const operation_1 = {
  id: '1',
  name: 'operation 1',
};

const operation_2 = {
  id: '2',
  name: 'operation 2',
};

const operation_3 = {
  id: '3',
  name: 'operation 3',
};

const operation_4 = {
  id: '4',
  name: 'operation 4',
};

export const operations = [operation_1, operation_2, operation_3, operation_4];

export const quotes = [
  {
    id: '1',
    content: 'This operation needs to be done by end of week.',
    author: operation_1,
  },
  {
    id: '2',
    content:
      'This operation needs to be done by end of day.',
    author: operation_2,
  },
  {
    id: '3',
    content: "This operation needs to be done by end of month.",
    author: operation_3,
  },
  {
    id: '4',
    content: 'xxxxx',
    author: operation_3,
  },
  {
    id: '5',
    content: 'xxxxx',
    author: operation_4,
  },
];

// So we do not have any clashes with our hardcoded ones
let idCount = quotes.length + 1;

export const getQuotes = (count) =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];

    const custom = {
      ...random,
      id: `G${idCount++}`,
    };

    return custom;
  });

export const getAuthors = (count) =>
  Array.from({ length: count }, (v, k) => k).map(() => {
    const random = operations[Math.floor(Math.random() * operations.length)];

    const custom = {
      ...random,
      id: `author-${idCount++}`,
    };

    return custom;
  });

const getByAuthor = (author, items) =>
  items.filter((quote) => quote.author === author);

export const authorQuoteMap = operations.reduce(
  (previous, author) => ({
    ...previous,
    [author.name]: getByAuthor(author, quotes),
  }),
  {},
);

export const generateQuoteMap = (quoteCount) =>
  operations.reduce(
    (previous, author) => ({
      ...previous,
      [author.name]: getQuotes(quoteCount / operations.length),
    }),
    {},
  );
