import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Device } from 'src/interfaces/device.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  private devicesCollection : AngularFirestoreCollection<Device>;
  private devices           : Observable<Device>;



  constructor(
    private afs: AngularFirestore
  ) { 
    this.devicesCollection = this.afs.collection<Device>('devices');
  }

  getDevices(): Observable<Device[]> {
    return this.afs.collection<Device>('devices', ref => ref.orderBy('createdAt', 'desc')).valueChanges();
  }

  getDevice(id: string): Observable<Device> {
    return this.devicesCollection.doc<Device>(id).valueChanges();
  }

  addDevices(device: Device): Promise<any> {
    const id  = this.afs.createId();
    device.id = id;
    device.createdAt = new Date();
    return this.devicesCollection.doc(id).set(device);
  }

  updateDevice( device: any): Promise<void> {
    return this.devicesCollection.doc(device.id).update(device)
  }
  
}
