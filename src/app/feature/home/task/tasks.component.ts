import { Component, OnInit} from '@angular/core';
import { Task } from 'src/app/shared/models/task.model';
import { TaskService } from './../../../shared/services/task.service';
import { map, Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TaskComponent implements OnInit {
  tasks$: Observable<Task[]>;
  selected: string;
  checked= false;
  editing: string = '';
  eventoCheck: string;
  ruta: string = "";

  constructor (
    public taskService: TaskService,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void{
    this.activateRoute.params.subscribe((params: Params)=>{
      this.ruta = params['status'];
      this.changeFilter(this.ruta || '')
    });
  }

  deleteTask(task: Task) {
    if(confirm('¿Estas seguro de querer eliminarlo?')){
      this.taskService.deleteTask(task);
    }
  }

  check(id:string){
    this.taskService.updateStatus(id);
  }

  editTask(id: string){
    this.editing = id;
  }

  removeEditMode(): void {
    this.editing = '';
  }

  changeTaskTitle(newTodoTitle: HTMLInputElement, id: string): void {
    let todoTitleFixed = newTodoTitle.value.trim();
    if (todoTitleFixed != "") {
      this.taskService.updateTodoTitle(todoTitleFixed, id);
      this.removeEditMode();
    }
  }

  changeFilter(filter: string) {
    this.tasks$ = this.taskService.todoReactiveStorage$
    .pipe(
      map((result: Task[]) =>{
        switch (filter) {
          case 'pending':
            return result.filter(filtrado => filtrado.completed != true)
            break;
          case 'completed':
            return result.filter(filtrado => filtrado.completed == true)
            break;
          default:
            return result
            break;
        }
      })
    )
  }
}
