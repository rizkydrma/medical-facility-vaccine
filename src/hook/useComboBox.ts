import { useState } from 'react';

const useComboBox = <T>() => {
  const [query, setQuery] = useState('');
  const [data, setData] = useState<T[] | null>(null);

  return { query, setQuery, data, setData };
};

export default useComboBox;
