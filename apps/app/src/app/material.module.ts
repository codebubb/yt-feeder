import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const modules = [MatSliderModule, MatInputModule, MatButtonModule];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
