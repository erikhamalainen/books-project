function descendingComparator(a, b, orderBy) {
  if (!a[orderBy] && !b[orderBy]) {
    return 0;
  } if (a[orderBy] && !b[orderBy]) {
    return -1;
  } if (!a[orderBy] && b[orderBy]) {
    return 1;
  }
  return a[orderBy].localeCompare(b[orderBy], undefined, { caseFirst: 'upper' });
}

function getComparator(order, orderBy) {
  return order && order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export {
  descendingComparator,
  getComparator,
};
