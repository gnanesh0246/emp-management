import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable()
export class EmployeeService {
  private BASE_URL = 'http://localhost:3050/'
  constructor(private httpClient: HttpClient) { }

  getURL(path: string): string {
    return `${this.BASE_URL}${path}`;
  }
  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.getURL('employees'));
  }

  getEmployeeDetails(employeeId: number): Observable<Employee> {
    return this.httpClient.get<Employee>(this.getURL(`employees/${employeeId}`));
  }

  updateEmployee(employee: any, id: number): Observable<any> {
    return this.httpClient.put(this.getURL(`employees/${id}`), employee);
  }

  addEmployee(employee: any): Observable<any> {
    return this.httpClient.post(this.getURL(`employees`), employee);
  }

}
