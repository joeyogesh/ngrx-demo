import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { selectAllTodos, selectLoading } from '../store/todos.selectors';
import { loadTodos, toggleTodo, deleteTodo } from '../store/todos.actions';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<Todo[]>;
  loading$: Observable<boolean>;

  constructor(private store: Store) {
    this.todos$ = this.store.select(selectAllTodos);
    this.loading$ = this.store.select(selectLoading);
  }

  ngOnInit() {
    this.store.dispatch(loadTodos());
  }

  onToggle(id: number) {
    this.store.dispatch(toggleTodo({ id }));
  }

  onDelete(id: number) {
    this.store.dispatch(deleteTodo({ id }));
  }
}
