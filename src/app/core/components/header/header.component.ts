import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService} from './../../../shared/services/task.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  ngTask: string;
  constructor(
    private taskService: TaskService
  ) { }

  save(){
    this.taskService.addTasks(this.ngTask)
    this.ngTask = '';
  }

}
