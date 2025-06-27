export function useArray<T>(
  getset: [T[], React.Dispatch<React.SetStateAction<T[]>>],
) {
  const [array, setArray] = getset;
  const push = (item: T) => {
    setArray((arr) => [...arr, item]);
  };

  const update = (index: number, item: T) => {
    setArray((a) => [
      ...a.slice(0, index),
      item,
      ...a.slice(index + 1, a.length),
    ]);
  };

  function remove(index: number) {
    setArray((a) => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
  }

  return [
    array,
    {
      set: setArray,
      push,
      update,
      remove,
    },
  ] as const;
}
