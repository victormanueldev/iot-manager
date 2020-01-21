import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DevicesService } from 'src/services/devices/devices.service';
import { Device } from 'src/interfaces/device.interface';
import { AuthService } from 'src/services/auth/auth.service';
import { Router } from '@angular/router';

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
    monitorizing  : new FormControl('true')
  });

  validationMessages  : any     = null;
  isOpenSidebar       : boolean = true;
  fileSelected        : any     = null;
  textInputFile       : string  = '';

  // Alerts Variables
  loading             : boolean = false;
  isPresentSuccess    : boolean = false;
  isPresentError      : boolean = false;
  successMessage      : string  = '';
  errorMessage        : string  = '';

  // Open Dropdown
  userDropdown        : boolean   = false;
  

  constructor(
    private devicesService  : DevicesService,
    private authService     : AuthService,
    private router          : Router
  ) { 

    this.validationMessages = {
      'name'        : [
        { type: 'required', message: 'Please type a device name' },
      ], 
      'description' : [
        { type: 'required', message: 'Please enter a device description' },
      ]
    }

    this.textInputFile = 'Select an device image...'

  }

  openSidebar(): void {
    this.isOpenSidebar = !this.isOpenSidebar;
  }

  ngOnInit() {
  }

  onSelectFile(event: any): void {
		// Propiedad Size se calcula en Bytes. 1KB = 1024B
		if (event.target.files.length > 0) {
        this.textInputFile = event.target.files[0].name
        this._handleReaderLoaded(event.target.files[0]);
        
		}
  }
  
  /**
   * Convert image to base64String
   * @param file 
   */
  private _handleReaderLoaded(file: any): void {
    let reader  = null;
    reader      = new FileReader();
    
    reader.readAsBinaryString(file)
    reader.onload = (_event) => {

      let binaryString = _event.target.result;
      this.fileSelected = `data:image/png;base64,${btoa(binaryString)}`;
    }
    
   }

   /**
    * Present a alert on a estimated time
    * @param type success - error
    */
   private _presentAlert(type: string, message: string): void {
    switch (type) {
      case 'success':
        this.isPresentSuccess = true;
        this.successMessage   = message;
        break;
      case 'error':
        this.isPresentError   = true;
        this.errorMessage     = message;
        break;
      default:
        this.isPresentError   = true;
        break;
    }

     setTimeout(() => {
      this.isPresentError   = false;
      this.isPresentSuccess = false;
     }, 5000)
   }

   /**
    * Send a Device to DB
    */
   async addDevice(): Promise<void> {
     this.loading = true;

    try {

      const device: Device = {
        name        : this.deviceForm.value.name,
        image       : this.fileSelected,
        description : this.deviceForm.value.description,
        status      : 'ok',
        enabled     : this.deviceForm.value.monitorizing == 'true' ? true : false,
        createdAt   : new Date()
      }

      await this.devicesService.addDevices(device);  
      this._presentAlert('success', 'Great! New device added');
      this.textInputFile = 'Select an device image...';
      this.deviceForm.reset();
      this.deviceForm.patchValue( { monitorizing : 'true' });

    } catch (error) {
      this._presentAlert('error', 'Unexpected error has ocurred');
    } finally {
      this.loading = false;
    }

   }

   async logout() {
     try {
       await this.authService.logout();
       this.router.navigate(['/auth/login']);
     } catch (error) {
       console.log(error);
       
     }
   }




}
