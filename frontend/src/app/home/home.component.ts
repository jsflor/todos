import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TodoService } from '../todo.service';
import { Todo } from '../todo.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  todos: Todo[] = [];
  loading = true;
  error = '';

  newTodoTitle = '';
  newTodoDescription = '';

  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.error = '';
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load todos';
        this.loading = false;
      }
    });
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo({
        title: this.newTodoTitle,
        description: this.newTodoDescription,
        completed: false
      }).subscribe({
        next: (newTodo) => {
          this.todos.unshift(newTodo);
          this.newTodoTitle = '';
          this.newTodoDescription = '';
        },
        error: () => {
          this.error = 'Failed to add todo';
        }
      });
    }
  }

  deleteTodo(id: number, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter(t => t.id !== id);
    });
  }

  toggleComplete(todo: Todo, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.todoService.updateTodo({
      ...todo,
      completed: !todo.completed
    })
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  viewDetail(id: number): void {
    this.router.navigate(['/todo', id]);
  }
}
