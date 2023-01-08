/* eslint-disable no-undef */
import { getComparator } from '../../../util/bookTableSorters';

const emptyBooks = [];

const someBooks = [
  {
    title: 'a title',
    author: 'test',
    description: 'test',
  },
  {
    title: 'b title',
    author: 'test',
    description: 'test',
  },
  {
    title: 'c title',
    author: 'test',
    description: 'test',
  },
];

const someBooksWrongOrder = [
  {
    title: 'b title',
    author: 'test',
    description: 'test',
  },
  {
    title: 'a title',
    author: 'test',
    description: 'test',
  },
  {
    title: 'c title',
    author: 'test',
    description: 'test',
  },
];

const noTitle = [
  {
    author: 'test',
  },
  {
    author: 'test2',
  },
  {
    author: 'test3',
  },
];

const someBooksNoTitle = [
  {
    title: 'a title',
    author: 'test',
    description: 'test',
  },
  {
    title: 'b title',
    author: 'test',
    description: 'test',
  },
  {
    author: 'test2',
  },
  {
    author: 'test3',
  },
];

const someBooksWrongOrderNoTitle = [
  {
    title: 'b title',
    author: 'test',
    description: 'test',
  },
  {
    author: 'test2',
  },
  {
    author: 'test3',
  },
  {
    title: 'a title',
    author: 'test',
    description: 'test',
  },
];

describe('Comparator tests', () => {
  it('works with no input', () => {
    const value = emptyBooks.slice().sort(getComparator('desc', 'title'));
    expect(value).toStrictEqual([]);
  });
  it('works with no parameters and no input', () => {
    const value = emptyBooks.slice().sort(getComparator());
    expect(value).toStrictEqual([]);
  });
  it('sorts correctly', () => {
    const value = someBooksWrongOrder.slice().sort(getComparator('desc', 'title'));
    expect(value).toStrictEqual(someBooks);
  });
  it('works if the field to be sorted by is missing', () => {
    const value = noTitle.slice().sort(getComparator('desc', 'title'));
    expect(value).toStrictEqual(noTitle);
  });
  it('works if some books do not have title', () => {
    const value = someBooksWrongOrderNoTitle.slice().sort(getComparator('desc', 'title'));
    expect(value).toStrictEqual(someBooksNoTitle);
  });
});
