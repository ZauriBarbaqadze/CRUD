import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css';
import { useMemo, useState, useEffect } from 'react';
import { MantineReactTable, type MRT_ColumnDef } from 'mantine-react-table';

interface Todo {
  text: string;
  completed: string;
  createdAt: string;
  deadline: string;
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

const Example = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('https://661a3da6125e9bb9f29b9ac1.mockapi.io/api/v1/todos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: any[]) => {
        const fetchedTodos: Todo[] = data.map(todoData => ({
          text: todoData.text,
          completed: todoData.completed ? "completed" : "uncompleted",
          createdAt: formatDate(todoData.createdAt),
          deadline: formatDate(todoData.deadline),
        }));
        setTodos(fetchedTodos);
      })
      .catch(error => {
        console.error('There was a problem fetching the data:', error);
      });
  }, []);

  const columns = useMemo<MRT_ColumnDef<Todo>[]>(
    () => [
      {
        accessorKey: 'text',
        header: 'Text',
      },
      {
        accessorKey: 'completed',
        header: 'Completed',
        
      },
      {
        accessorKey: 'createdAt',
        header: 'Created At',
      },
      {
        accessorKey: 'deadline',
        header: 'Deadline',
      },
    ],
    [],
  );

  return <MantineReactTable columns={columns} data={todos} />;
};

export default Example;
