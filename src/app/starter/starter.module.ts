import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { StarterComponent } from './starter.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: '화재파악 인공위성',
      urls: [
        { title: '송도 소방서', url: '/dashboard' },
        { title: '화재파악 인공위성' }
      ]
    },
    component: StarterComponent
  }
];

@NgModule({
  imports: [FormsModule, CommonModule, RouterModule.forChild(routes)],
  declarations: [StarterComponent]
})
export class StarterModule { }
