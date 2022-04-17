import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DevicesService } from 'src/services/devices/devices.service';
import { Device } from 'src/interfaces/device.interface';
import { Chart } from 'chart.js';
import { range } from 'rxjs';
import { NewDevices } from './devices';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('chartOverallStatus', {static: false}) refChartOverallStatus           : ElementRef;
  @ViewChild('chartDevicesMonitoring', { static: false }) refChartDevicesMonitoring : ElementRef

  devices : Device[]  = [];
  mewDevices: Device[] = NewDevices;

  // Chart Variables
  ctxChartOverallStatus     : CanvasRenderingContext2D  = null;
  chartOveralStatatus       : any                       = null;
  ctxChartDevicesMonitoring : CanvasRenderingContext2D  = null;
  chartDevicesMonitoring    : any                       = null;
  optionsChart              : any = {
    type  : 'doughnut',
    data  : {
      datasets: [
        {
          data: [60, 30],
          backgroundColor: ['#5B5775', '#6c63ff'],
          borderColor: ['#5B5775', '#6c63ff']
        },

      ]
    },
    options : {
      responsive: true,
      tooltips: {
        enabled: false
      },
      legend: {
        display: false,
        position: 'bottom',
        labels: {
          fontColor: 'white'
        }
      },
      gridLines: {
        display: false
      },
    }
  }

  // Binding Variables
  isUpdating  : boolean = true;

  // Pagination Variables
  paginator     : number = 0;
  shownDevices  : Device[] = [];
  isEnabledNext : boolean = true;


  constructor(
    private devicesService : DevicesService
  ) { }

  ngAfterViewInit() {
    // Get 2D Context of HTMLCanvasElement
    this.ctxChartOverallStatus      = (<HTMLCanvasElement>this.refChartOverallStatus.nativeElement).getContext('2d');
    this.chartOveralStatatus        = new Chart(this.ctxChartOverallStatus, this.optionsChart);

    this.ctxChartDevicesMonitoring  = (<HTMLCanvasElement>this.refChartDevicesMonitoring.nativeElement).getContext('2d');
    this.chartDevicesMonitoring     = new Chart(this.ctxChartDevicesMonitoring, this.optionsChart);


  }

  ngOnInit() {

    // const start = new Date(2012, 0 ,1)
    // const end = new Date()
    // this.devices = this.mewDevices.map(device => {
    //   return {...device, createdAt: new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))}
    // });
    // this.devices.forEach( async  device => {
    //   try {
    //     await this.devicesService.addDevices(device)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // });

    this.devicesService.getDevices().subscribe( val => {
      console.log(val);
      this.devices = val;
      this._drawCharts();
      this._paginatorSource();
      this.isUpdating = false;
    });



  }

  /**
   * Update the chart data
   */
  private _drawCharts(): void {
    
    this.chartOveralStatatus.data.datasets[0].data    = this._filterDevices('status','ok');
    this.chartDevicesMonitoring.data.datasets[0].data = this._filterDevices('enabled',true);
    
    this.chartOveralStatatus.update();
    this.chartDevicesMonitoring.update();
  }

  /**
   * Filter to get the percentage of devices by each condition
   * @param attribute Device attribute
   * @param value Value to compare 
   */
  private _filterDevices(attribute: string, value: string | boolean): Array<number> {
    // Apply filters
    let devicesFilter  = this.devices.filter(device => device[attribute] === value ).length;

    // Get the percentages
    let percentageDevicesIncluded = (this.devices.length * devicesFilter) / 100;
    let percentageDevicesExcluded = 100.0 - percentageDevicesIncluded;
    console.log(attribute, [ percentageDevicesIncluded, percentageDevicesExcluded ]);
        
    return [ percentageDevicesIncluded, percentageDevicesExcluded ];
  }

  prev(): void {
    this.paginator -= 5;
    this._paginatorSource();
  }

  next(): void {
    // console.log('last', this.devices[this.devices.length -1])
    this.paginator += 5;
    this._paginatorSource();
  }

  /**
   * Get the paged device list 
   */
  private _paginatorSource(): void {
    this.shownDevices = [];
     
    range(this.paginator, 5)
      .subscribe( pag => {
        if(this.devices[pag]){
          this.shownDevices.push( this.devices[pag] );
          this.isEnabledNext = true
        } else {
          this.isEnabledNext = false
        }
      });

  }

  async update(deviceID: string, monitorizingState: boolean): Promise<void>{
    try {
      const data = {
        id: deviceID,
        enabled: monitorizingState = !monitorizingState
      }

      await this.devicesService.updateDevice(data);

    } catch (error) {
      console.log(error) 
    }
  }




}
