import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Device } from 'src/interfaces/device.interface';
import { DevicesService } from 'src/services/devices/devices.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  device: any = {};
  obs$Device: Subscription = null;

  constructor(
    private route: ActivatedRoute,
    private deviceService: DevicesService
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe( (params) => {
      console.log(params['params'].id);
      this.obs$Device = this.deviceService.getDevice(params['params'].id).subscribe( val => {
        this.device = val;
      });
      
    });

  }

  async update(deviceID: string, monitorizingState: boolean): Promise<void>{
    try {
      const data = {
        id: deviceID,
        enabled: monitorizingState = !monitorizingState
      }

      await this.deviceService.updateDevice(data);

    } catch (error) {
      console.log(error) 
    }
  }

}
