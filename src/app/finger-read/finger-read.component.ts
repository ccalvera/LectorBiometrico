import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  CardsReader,
  FingerprintReader,
  SampleFormat,
  DeviceConnected,
  DeviceDisconnected,
  SamplesAcquired,
  AcquisitionStarted,
  AcquisitionStopped,
} from '@digitalpersona/devices';
import { promises } from 'dns';

import './modules/WebSdk';

@Component({
  selector: 'app-finger-read',
  templateUrl: './finger-read.component.html',
  styleUrls: ['./finger-read.component.scss'],
})
export class FingerReadComponent implements OnInit, OnDestroy {
  private reader: FingerprintReader;

  listaFingerprintReader: any;
  infoFingerprintReader: any;
  listSamplesFingerprints: any;
  currentImageFinger: any;
  currentImageFingerFixed: any;
  huella: boolean = false;

  constructor() {
    this.reader = new FingerprintReader();
  }

  ngOnInit(): void {
    // this.reader = new FingerprintReader();
    this.reader.on('DeviceConnected', this.onDeviceConnected);
    this.reader.on('DeviceDisconnected', this.onDeviceDisconnected);
    this.reader.on('AcquisitionStarted', this.onAcquisitionStarted);
    this.reader.on('AcquisitionStopped', this.onAcquisitionStopped);
    this.reader.on('SamplesAcquired', this.onSamplesAcquired);
  }

  ngOnDestroy() {
    this.reader.off('DeviceConnected', this.onDeviceConnected);
    this.reader.off('DeviceDisconnected', this.onDeviceDisconnected);
    this.reader.off('AcquisitionStarted', this.onAcquisitionStarted);
    this.reader.off('AcquisitionStopped', this.onAcquisitionStopped);
    this.reader.off('SamplesAcquired', this.onSamplesAcquired);
  }

  private onDeviceConnected = (event: DeviceConnected) => {
    console.log('Device connected', event);
  };

  private onDeviceDisconnected = (event: DeviceDisconnected) => {
    console.log('Device disconnected', event);
  };

  private onAcquisitionStarted = (event: AcquisitionStarted) => {
    console.log('Acquisition started');
    console.log(event);
  };

  private onAcquisitionStopped = (event: AcquisitionStopped) => {
    console.log('Acquisition stopped');
    console.log(event);
  };

  private onSamplesAcquired = (event: SamplesAcquired) => {
    console.log('Samples acquired');
    console.log(event);
    this.listSamplesFingerprints = event;
  };

  listaDispositivos() {
    Promise.all([this.reader.enumerateDevices()])
      .then((values) => {
        this.listaFingerprintReader = values[0];
        console.log(this.listaFingerprintReader);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  infoDispositivo() {
    Promise.all([this.reader.getDeviceInfo(this.listaFingerprintReader[0])])
      .then((values) => {
        this.infoFingerprintReader = values[0];
        console.log(this.infoFingerprintReader);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  capturaHuella() {
    this.reader
      .startAcquisition(
        SampleFormat.PngImage,
        this.infoFingerprintReader['DeviceID']
      )
      .then((response) => {
        console.log('inicia captura');
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  finalizarCaptura() {
    this.reader
      .stopAcquisition(this.infoFingerprintReader['DeviceID'])
      .then((response) => {
        console.log('finaliza captura');
        console.log(response);
        console.log(this.listSamplesFingerprints);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  mostrarHuella() {
    var listaHuellas = this.listSamplesFingerprints['samples'];
    var lsize = Object.keys(listaHuellas).length;
    if (listaHuellas != null && listaHuellas != undefined) {
      if (lsize > 0) {
        this.currentImageFinger = listaHuellas[0];
        this.currentImageFingerFixed = this.fixFormat64(
          this.currentImageFinger
        );
      }
    }
    this.huella = true;
  }

  fixFormat64(prm_imagebase: any) {
    var strImage = '';
    strImage = prm_imagebase;

    strImage = strImage.replace(/_/g, '/');
    strImage = strImage.replace(/-/g, '+');

    return strImage;
  }
}
