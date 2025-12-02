import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Todo } from '../../features/todos/models/todo.model'

@Injectable({
    providedIn: 'root'
})
export class TodoService {
    private todos: Todo[] = [
        { id: 1, title: 'Learn NgRx', completed: false },
        { id: 2, title: 'Build Todo App', completed: true },
        { id: 3, title: 'Write blog post', completed: false }
    ];

    constructor() { }

    // Simulate GET /todos
    getTodos(): Observable<Todo[]> {
        // delay to simulate API latency
        return of([...this.todos]).pipe(delay(500));
    }

    // Simulate POST /todos
    addTodo(title: string): Observable<Todo> {
        const newTodo: Todo = {
            id: this.todos.length + 1,
            title,
            completed: false
        };
        this.todos.push(newTodo);
        return of(newTodo).pipe(delay(300));
    }

    // Simulate PATCH /todos/:id (toggle complete)
    toggleTodo(id: number): Observable<Todo> {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
        return of(todo!).pipe(delay(200));
    }

    // Simulate DELETE /todos/:id
    deleteTodo(id: number): Observable<number> {
        this.todos = this.todos.filter(t => t.id !== id);
        return of(id).pipe(delay(200));
    }
}
