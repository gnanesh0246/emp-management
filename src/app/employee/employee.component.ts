import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {
  employeeId: number;
  employee: Employee;
  subscription: Subscription;
  paramSubScription: Subscription;
  employeeForm: FormGroup;
  constructor(private route: ActivatedRoute,
     private router: Router,
     private employeeService: EmployeeService, private fb: FormBuilder) { }

  ngOnInit() {
    this.paramSubScription = this.route.params.subscribe((params) => {
      this.employeeId = params['id'];
      if(+this.employeeId > 0) {
        this.subscription = this.employeeService.getEmployeeDetails(this.employeeId).subscribe((res: Employee) => {
          this.employee = res;
          this.buildEmployeeForm();
        });
      } else {
        this.employee = new Employee();
        this.buildEmployeeForm();
      }
    });
  }

  buildEmployeeForm() {
    this.employeeForm = this.fb.group({
      firstName: [this.employee.firstName, [ Validators.required]],
      lastName: [this.employee.lastName, [ Validators.required]],
      city: [this.employee.city, [ Validators.required]],
      country: [this.employee.country, [ Validators.required]],
      state: [this.employee.state, [ Validators.required]],
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.paramSubScription) {
      this.paramSubScription.unsubscribe();
    }
  }

  saveEmployee(): void {
    if (this.employeeId && this.employeeId > 0) {
      this.employeeService.updateEmployee({...this.employeeForm.value }, this.employee.id).subscribe((res) => {
        this.router.navigate(['']);
      })
    } else {
      this.employeeService.addEmployee(this.employeeForm.value).subscribe((res) => {
        this.router.navigate(['']);
      });
    }
  }

}
