import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  deviceForm = new FormGroup({
    name          : new FormControl('', Validators.required),
    description   : new FormControl('', Validators.required),
    image         : new FormControl(''),
    monitorizing  : new FormControl('')
  });

  validationMessages: any = null;
  isOpenSidebar: boolean = true;

  constructor() { 

    this.validationMessages = {
      'name'        : [
        { type: 'required', message: 'Please type a device name' },
      ], 
      'description' : [
        { type: 'required', message: 'Please enter a device description' },
      ]
    }

  }

  openSidebar(): void {
    console.log('enter');
    
    this.isOpenSidebar = !this.isOpenSidebar;
  }

  ngOnInit() {
  }



}
