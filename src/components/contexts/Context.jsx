import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    '2024-01-05': [
      { type: 'warning', content: 'evento.', id: uuidv4() },
      { type: 'success', content: 'Tarefa.1', id: uuidv4() }
    ],
    '2024-02-01': [
      { type: 'warning', content: 'evento.', id: uuidv4() },
      { type: 'success', content: 'Tarefa.2', id: uuidv4() }
    ],
    '2024-02-10': [
      { type: 'warning', content: 'evento.', id: uuidv4() },
      { type: 'success', content: 'Tarefa.', id: uuidv4(), titulo: 'test' }
    ]
  });

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
