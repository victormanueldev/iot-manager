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

  getFirstDevices(): Observable<Device[]> {
    return this.afs.collection<Device>('devices', ref => ref.orderBy('createdAt', 'desc').limit(5)).valueChanges();
  }

  getDevicesPaginate(device: Device): Observable<Device[]> {
    return this.afs.collection<Device>('devices', ref => ref.orderBy('createdAt', 'desc').startAfter(device.createdAt).limit(5)).valueChanges();
  }

  addDevices(device: Device): Promise<any> {
    const id  = this.afs.createId();
    device.id = id;
    device.createdAt = new Date();
    return this.devicesCollection.doc(id).set(device);
  }

  updateDevice( device: Device): Promise<void> {
    return this.devicesCollection.doc(device.id).update(device)
  }
  
}
