'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      fetchTodos();
    }
  }, [status, router]);

  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    if (response.ok) {
      const data = await response.json();
      setTodos(data);
    }
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: newTodo }),
    });

    if (response.ok) {
      setNewTodo('');
      fetchTodos();
      toast({
        title: 'Success',
        description: 'Todo added successfully',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to add todo',
        variant: 'destructive',
      });
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    });

    if (response.ok) {
      fetchTodos();
    } else {
      toast({
        title: 'Error',
        description: 'Failed to update todo',
        variant: 'destructive',
      });
    }
  };

  const deleteTodo = async (id: string) => {
    const response = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchTodos();
      toast({
        title: 'Success',
        description: 'Todo deleted successfully',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to delete todo',
        variant: 'destructive',
      });
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Welcome, {session?.user?.name}</h1>
        <form onSubmit={addTodo} className="mb-4 flex">
          <Input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
            className="mr-2 flex-grow"
          />
          <Button type="submit">Add Todo</Button>
        </form>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li key={todo._id} className="flex items-center justify-between rounded bg-white p-2 dark:bg-gray-800">
              <div className="flex items-center">
                <Checkbox
                  id={todo._id}
                  checked={todo.completed}
                  onCheckedChange={(checked) => toggleTodo(todo._id, checked as boolean)}
                  className="mr-2"
                />
                <label
                  htmlFor={todo._id}
                  className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
                >
                  {todo.text}
                </label>
              </div>
              <Button variant="destructive" size="sm" onClick={() => deleteTodo(todo._id)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}