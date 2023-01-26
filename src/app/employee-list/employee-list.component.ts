import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  subScription: Subscription;
  displayedColumns = ['id', 'firstName', 'lastName', 'city', 'actions'];
  data: Employee[] = [];
  constructor(private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    this.subScription = this.employeeService.getEmployees().subscribe((res: Employee[]) => {
      this.data = res;
    });
  }

  ngOnDestroy(): void {
    if (this.subScription) {
      this.subScription.unsubscribe();
    }
  }

  viewEmployeeDetails(id: string) {
    this.router.navigate(['details', id]);
  }

  editEmployee(id: string) {
    this.router.navigate(['employee', id]);
  }

}
