import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Task} from '../interfaces/task';
import {TaskMaterial} from '../interfaces/task-material';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseURL: string = environment.baseUrl + 'tasks';

  constructor(private http: HttpClient) {
  }

  getTasks(status: string, query: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('search', query);
    return this.http.get(this.baseURL + '/' + status + '/v2', {params: params});
  }

  getTasks2(year: string, month: string, search: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('search', search);
    return this.http.get(this.baseURL + '/' + year + '/' + month + '/s', {params: params});
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(this.baseURL + '/' + id);
  }

  create(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseURL, task);
  }

  update(task: Task): Observable<Task> {
    return this.http.patch<Task>(this.baseURL + '/' + task._id, task);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.baseURL + '/' + id);
  }

  // Lista de Materiales.
  getTaskMaterials(taskId: string): Observable<any> {
    return this.http.get(this.baseURL + '/' + taskId + '/material');
  }

  getTaskMaterial(id: string): Observable<TaskMaterial> {
    return this.http.get<TaskMaterial>(this.baseURL + '/material/' + id);
  }

  createMaterial(taskMaterial: TaskMaterial): Observable<TaskMaterial> {
    return this.http.post<TaskMaterial>(this.baseURL + '/material', taskMaterial);
  }

  updateMaterial(taskMaterial: TaskMaterial): Observable<TaskMaterial> {
    return this.http.patch<TaskMaterial>(this.baseURL + '/material/' + taskMaterial._id, taskMaterial);
  }

  deleteMaterial(id: string): Observable<any> {
    return this.http.delete(this.baseURL + '/material/' + id);
  }

}
