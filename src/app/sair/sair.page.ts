import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sair',
  templateUrl: './sair.page.html',
  styleUrls: ['./sair.page.scss'],
})
export class SairPage implements OnInit {

  constructor() { 
    
    location.assign('/home')

    localStorage.setItem('login' , '')

  }

  ngOnInit() {
  }

}
