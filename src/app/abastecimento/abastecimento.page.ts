import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'; // Importe do 'storage-angular'

@Component({
  selector: 'app-abastecimento',
  templateUrl: './abastecimento.page.html',
  styleUrls: ['./abastecimento.page.scss'],
})
export class AbastecimentoPage implements OnInit {
  dadosVeiculos: any = [];

  Data: string = '';
  IDVeiculo: string = '';
  QtLitros: string = '';
  Valor: string = '';
  IDMotorista: string = '';

  constructor(private http: HttpClient, private storage: Storage, private alertController: AlertController) { }

  ngOnInit() {
    this.obterDadosVeiculos()
    this.atualizarDataEHora()
    this.get_id()
  }
  atualizarDataEHora() {
    const agora = new Date();
    this.Data = agora.toISOString().slice(0, 10);
  }

  obterDadosVeiculos() {
    this.http.get<any[]>('https://vitalimodas.com/API/Motorista/dados_veiculos.php').subscribe(
      response => {
        this.dadosVeiculos = response.map(veiculo => ({
          ID: veiculo.ID,
          Nome: veiculo.Nome,
        }));
        console.log('Dados de Veículos:', this.dadosVeiculos);
      },
      error => {
        console.error('Erro ao obter dados de veículos:', error);
      }
    );
  }

  async get_id() {

    try {
      await this.storage.create();
      const id = await this.storage.get('id');
      if (id) {
        this.IDMotorista = id; // Se o ID existir, defina-o em IDMotorista
      } else {
        console.error('ID não encontrado no armazenamento local');
      }
    } catch (error) {
      console.error('Erro ao obter ID do armazenamento local:', error);
    }
  }

  onSubmit() {
    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!this.Valor || !this.IDVeiculo || !this.Data || !this.QtLitros) {
      this.mostrarAlerta('Erro!', 'Todos os campos são obrigatórios.');
      return;
    }

    // Aqui você pode implementar a lógica para enviar os dados do formulário
    const body = new FormData();
    body.append('IDMotorista', this.IDMotorista);
    body.append('Valor', this.Valor);
    body.append('Data', this.Data);
    body.append('IDVeiculo', this.IDVeiculo);
    body.append('QtLitros', this.QtLitros);

    this.http.post<any>('https://vitalimodas.com/API/Motorista/cadastrar_abastecimento.php', body).subscribe(
      response => {
        console.log('Resposta do servidor:', response);
        if (response.message === 'Abastecimento cadastrado com sucesso') {
          this.mostrarAlerta('Sucesso!', 'Abastecimento cadastrado com sucesso.').then(() => {
          
          });
        } else {
          this.mostrarAlerta('Erro!', 'Erro ao cadastrar rota.');
        }
      },
      error => {
        console.error('Erro ao cadastrar rota:', error);
        this.mostrarAlerta('Erro!', 'Erro ao cadastrar rota.');
      }
    );
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
        text: 'OK',
        handler: () => {
          // Limpar os campos após o cadastro bem-sucedido
          location.reload();
        }
      }]
    });

    await alert.present();
  }

  rotas() {
    location.assign('/rotas');
  }

  relatorios() {
    location.assign('/registros');
  }

  home() {
    location.assign('/index');
  }

  sair() {
    location.assign('/sair');
  }

  abastecimento() {
    location.assign('/abastecimento');
  }

  combustivel(){
    location.assign('/combustivel');
  }

}
