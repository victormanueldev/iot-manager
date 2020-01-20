import { Component, OnInit } from '@angular/core';
import { DevicesService } from 'src/services/devices/devices.service';
import { Device } from 'src/interfaces/device.interface';
import { NewDevices } from './devices';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  devices : Device[];
  mewDevices = NewDevices;

  constructor(
    private devicesService : DevicesService
  ) { }

  ngOnInit() {

    // this.devices = this.mewDevices;
    // this.devices.forEach( async  device => {
    //   try {
    //     await this.devicesService.addDevices(device)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // });

    this.devicesService.getFirstDevices().subscribe( (val) => { this.devices = val; console.log(this.devices) } );

  }

  prev(): void {
    this.devicesService.getDevicesPaginate(this.devices[0]).subscribe( val => { this.devices = val; console.log(this.devices) } )
  }

  next(): void {
    // console.log('last', this.devices[this.devices.length -1])
    this.devicesService.getDevicesPaginate(this.devices[this.devices.length -1]).subscribe( val => { this.devices = val; console.log(this.devices) } )
  }




}
