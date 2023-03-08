import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {
  private todoReactiveStorage: BehaviorSubject<Task[]>;
  todoReactiveStorage$!: Observable<Task[]>;
  constructor(
  ) {
    this.todoReactiveStorage = new BehaviorSubject<Task[]>(this.getTasks());
    this.todoReactiveStorage$ = this.todoReactiveStorage.asObservable();
  }

  findIndexById(idParameter: string): number {
    return this.getTasks().findIndex((task) => task.id == idParameter);
  }

  getTasks() {
    return JSON.parse(localStorage.getItem('mydayapp-angular')!) ? JSON.parse(localStorage.getItem('mydayapp-angular')!) : [];
  }

  addTasks(task: string){
    let tasks = this.getTasks();
    tasks.push(
      {
        id: tasks.length > 0 ? String(Math.max.apply(null, tasks.map(task => Number(task.id))) + 1) : '1',
        title: task,
        completed: false
      }
    );
    this.updateTasks(tasks);
  }

  deleteTask(task: Task) {
    let tasks = this.getTasks();
    for (let i = 0; i < tasks.length; i++){
      if(task == tasks[i]) {
        tasks.splice(i, 1);
        this.updateTasks(tasks);
      }
    }
  }

  clearCompletedTask() {
    let tasks = this.getTasks().filter(task => task.completed == false);
    this.updateTasks(tasks);
  }

  updateStatus(idParameter: string) {
    let tasks = this.getTasks();
    let index = this.findIndexById(idParameter);
    tasks[index].completed = !tasks[index].completed;
    this.updateTasks(tasks);
  }

  updateTasks(task: Task[]): void {
    this.todoReactiveStorage.next(task);
    localStorage.removeItem('mydayapp-angular');
    localStorage.setItem('mydayapp-angular', JSON.stringify(task));
  }

  updateTodoTitle(newTodoTitle: string, idParameter: string): void {
    let tasks = this.getTasks();
    tasks[this.findIndexById(idParameter)].title = newTodoTitle;
    this.updateTasks(tasks);
  }


  filterByUrl(ruta:String) {
    this.todoReactiveStorage
    .pipe(
      map(tasks => tasks.filter(task => {
        if(ruta == 'all'){
          return true;
        }
        if(ruta == 'pending' && task.completed == false){
          return true;
        }
        if(ruta == 'completed' && task.completed == true){
          return true;
        }
        return false;
      }))
    )
  }

}
