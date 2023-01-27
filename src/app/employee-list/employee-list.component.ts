import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EmployeeDeleteDialogComponent } from '../employee-delete-dialog/employee-delete-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  subScription: Subscription;
  displayedColumns = ['id', 'firstName', 'lastName', 'city', 'actions'];
  data: Employee[] = [];
  constructor(private employeeService: EmployeeService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar ) { }

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

  viewEmployeeDetails(id: number) {
    this.router.navigate(['details', id]);
  }

  editEmployee(id: number) {
    this.router.navigate(['employee', id]);
  }

  confirmDelete(id: number) {
    let dialogRef = this.dialog.open(EmployeeDeleteDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteEmployee(id);
      }
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.data = this.data.filter((x) => x.id !== id);
      this.snackBar.open('Employee deleted successfully', null, {
        duration: 2000
      });
    })
  }

}
