import { Injectable } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [
    { id: 1, title: 'Buy groceries', description: 'Milk, eggs, bread', completed: false },
    { id: 2, title: 'Do laundry', description: 'Wash clothes', completed: true }
  ];

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodo(id: number): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  addTodo(todo: Omit<Todo, 'id'>): void {
    const newId = Math.max(...this.todos.map(t => t.id), 0) + 1;
    this.todos.push({ id: newId, ...todo });
  }

  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}