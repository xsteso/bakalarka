export const descendingComparator = (
  a: any,
  b: any,
  orderBy: string,
  t: (translation_key: string) => void
) => {
  // We want to support multiple level objects for comparison
  const orderByArr = orderBy.split(".");

  let a_parsed = a;
  let b_parsed = b;

  orderByArr.forEach((key) => {
    a_parsed = a_parsed[key];
    b_parsed = b_parsed[key];
  });

  if (isNaN(a_parsed) || isNaN(b_parsed)) {
    // If the sort key is actually a translation key, we want to translate it first
    a_parsed = t(a_parsed);
    b_parsed = t(b_parsed);

    return b_parsed.localeCompare(a_parsed);
  } else {
    a_parsed = +a_parsed;
    b_parsed = +b_parsed;

    return a_parsed < b_parsed ? 1 : a_parsed > b_parsed ? -1 : 0;
  }
};

export const getComparator = (
  order: string,
  orderBy: string,
  t: (translation_key: string) => void
) => order === "desc"
    ? (a: any, b: any) => descendingComparator(a, b, orderBy, t)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy, t);
