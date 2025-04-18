import { Component } from '@angular/core';
import { Todo, TodoService } from '../todo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-todo-detail',
  standalone: false,
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.css'
})
export class TodoDetailComponent {
  todo: Todo | undefined;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.todoService.getTodo(id).subscribe(todo => {
      this.todo = todo;
      this.isLoading = false;
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}
