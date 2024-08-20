import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage {

  nomeSalvo: string = '';

  constructor(private menuCtrl: MenuController, private storage: Storage) {}

  async ngOnInit() {
    // Verifica se o banco de dados foi criado, caso contrário, cria
    await this.storage.create();
    
 
    this.nomeSalvo = await this.storage.get('nome');
  }

  abrirMenu() {
    this.menuCtrl.open();
  }

  rotas() {
    location.assign('/rotas');
  }

  relatorios(){
    location.assign('/registros');
  }

  home() {
    location.assign('/index');
  }
  abastecimento(){
    location.assign('/abastecimento');
  }

  combustivel(){
    location.assign('/combustivel');
  }

  sair() {
    location.assign('/sair');
  }
}
