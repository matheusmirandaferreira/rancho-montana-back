export function fieldsErrors(
  keys: { [key: string]: string | number | any },
  message?: string
) {
  const nullableKeys = Object.keys(keys);

  let errorsObj = {};

  nullableKeys.forEach((item) => {
    if (!keys[item]) {
      errorsObj[item] = message || `Este campo é obrigatório`;
    }
    if (keys[item] instanceof Array) {
      const arr = keys[item] as any[];
      if (arr.length === 0)
        errorsObj[item] = message || `Este campo é obrigatório`;
    }
  });

  return errorsObj;
}
