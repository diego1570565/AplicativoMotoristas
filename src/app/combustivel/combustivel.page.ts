import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-combustivel',
  templateUrl: './combustivel.page.html',
  styleUrls: ['./combustivel.page.scss'],
})
export class CombustivelPage {

  nomeSalvo: string = '';
  registros: any[] = [];
  data: string = '';
  data2: string = '';
  IDMotorista: string = '';


  constructor(
    private http: HttpClient,
    private storage: Storage,

  ) { }

  async ngOnInit() {
    // Verifica se o banco de dados foi criado, caso contrário, cria
    await this.storage.create();
    
    this.filtrarRegistros()
    this.nomeSalvo = await this.storage.get('nome');
  }

  async filtrarRegistros() {

    try {
      await this.storage.create();
      const id = await this.storage.get('id');
      if (id) {
        this.IDMotorista = id;
        console.log('ID = ' + this.IDMotorista)
      } else {
        console.error('ID não encontrado no armazenamento local');
      }
    } catch (error) {
      console.error('Erro ao obter ID do armazenamento local:', error);
    }
    console.log('id_motorista = ' + this.IDMotorista)
    // const url = `https://vitalimodas.com/API/Motorista/dados_rotas.php?idMotorista=${this.IDMotorista}&data=${this.data}&data2=${this.data2}`;
    const url = `https://vitalimodas.com/API/Motorista/dados_abastecimento.php?idMotorista=${this.IDMotorista}`;
    try {
      const response = await this.http.get<any>(url).toPromise();
      console.log(response);
      if (response.message != 'Nenhum dado encontrado') {
        if (Array.isArray(response)) {
          // Formatando a data no formato dd/mm/yyyy
          const registrosFormatados = response.map((item) => {
            const dataFormatada = new Date(item.Data);
            dataFormatada.setDate(dataFormatada.getDate() + 1); // Aumentando um dia
            const dataFormatadaString = dataFormatada.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });
            return { ...item, Data: dataFormatadaString };
          });
          this.registros = registrosFormatados;
        } else if (response && response.message) {
          console.error('Erro ao obter registros:', response.message);
        } else {
          console.error('Resposta inválida da API:', response);
        }
      } else {
        this.registros = [];
      }
    } catch (error) {
      console.error('Erro ao obter registros:', error);
    }


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
