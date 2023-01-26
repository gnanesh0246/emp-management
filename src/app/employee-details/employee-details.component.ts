import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employeeId: number;
  employeeDetails$: Observable<Employee>;
  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.employeeId = params['id'];
      this.employeeDetails$ = this.employeeService.getEmployeeDetails(this.employeeId);
    });
  }

}
