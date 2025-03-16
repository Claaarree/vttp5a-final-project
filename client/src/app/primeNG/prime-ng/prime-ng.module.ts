import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { RatingModule } from 'primeng/rating';
import { GalleriaModule } from 'primeng/galleria';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FloatLabel,
    CardModule,
    FileUploadModule,
    ToastModule,
    SelectModule,
    TextareaModule,
    RatingModule,
    GalleriaModule
  ],
  exports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FloatLabel,
    CardModule,
    FileUploadModule,
    ToastModule,
    SelectModule,
    TextareaModule,
    RatingModule,
    GalleriaModule
  ]
})
export class PrimeNGModule { }
