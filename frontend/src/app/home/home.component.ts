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
  newTodoTitle = '';
  newTodoDescription = '';

  constructor(
    private todoService: TodoService,
    private authService: AuthService,
    private router: Router
  ) {
    this.todos = this.todoService.getTodos();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addTodo(): void {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo({
        title: this.newTodoTitle,
        description: this.newTodoDescription,
        completed: false
      });
      this.todos = this.todoService.getTodos();
      this.newTodoTitle = '';
      this.newTodoDescription = '';
    }
  }

  toggleComplete(todo: Todo, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo);
  }

  viewDetail(id: number): void {
    this.router.navigate(['/todo', id]);
  }
}
