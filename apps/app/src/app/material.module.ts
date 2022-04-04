import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const modules = [
  MatSliderModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
