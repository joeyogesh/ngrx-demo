import { Component } from '@angular/core';
import { TodoInputComponent } from './features/todos/components/todo-input.component';
import { TodoListComponent } from './features/todos/components/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoInputComponent, TodoListComponent],
  template: `
    <app-todo-input></app-todo-input>
    <app-todo-list></app-todo-list>
  `
})
export class App { }
