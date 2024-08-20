import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular'; // Importe do 'storage-angular'

@Component({
  selector: 'app-retroativo',
  templateUrl: './retroativo.page.html',
  styleUrls: ['./retroativo.page.scss'],
})
export class RetroativoPage implements OnInit {

  IDMotorista: string = '';
  horaAtual: string = '';
  Data: string = '';
  HoraSaida: string = '';
  KmInicial: string = '';
  Destino: string = '';
  HoraChegada: string = '';
  KmFinal: string = '';
  dadosVeiculos: any = [];
  dadosUsuarios: any = [];
  IDVeiculo: string = '';
  Origem: string = "Clube Campestre Belo Horizonte";
  motoristas = [

  ];

  constructor(private http: HttpClient, private storage: Storage, private alertController: AlertController) { }

  ngOnInit() {


    this.obterDadosVeiculos()
    this.get_id()
    this.atualizarDataEHora()
    setInterval(() => {
      this.atualizarHorario();
    }, 100);
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

  atualizarHorario() {
    const agora = new Date();
    const hora = agora.getHours().toString().padStart(2, '0');
    const minuto = agora.getMinutes().toString().padStart(2, '0');
    const segundo = agora.getSeconds().toString().padStart(2, '0');
    this.horaAtual = `${hora}:${minuto}:${segundo}`;

  }

  esqueci(){
    location.assign('/rotas');
  }
  rotas() {
    location.assign('/rotas');
  }

  home() {
    location.assign('/index');
  }

  relatorios() {
    location.assign('/registros');
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

  obterDadosVeiculos() {
    this.http.get<any[]>('https://vitalimodas.com/API/Motorista/dados_veiculos.php').subscribe(
      response => {
        console.log(response);
  
        // Filtrar veículos com status igual a 1
        const veiculosAtivos = response.filter(veiculo => veiculo.Status === '1');
  
        // Mapear os veículos filtrados para o formato desejado
        this.dadosVeiculos = veiculosAtivos.map(veiculo => ({
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
  

  async onVeiculoChange() {
    let url = `https://vitalimodas.com/API/Motorista/dados_veiculos.php?id=${this.IDVeiculo}`;
  
    this.http.get<any[]>(url).subscribe(
      response => {
        // Verifica se há algum dado retornado na resposta
        if (response && response.length > 0) {
          const veiculoSelecionado = response[0]; // Acessa o primeiro elemento do array (veículo selecionado)
  
          this.KmInicial = veiculoSelecionado.Hodometro;
          console.log('Dados do Veículo:', veiculoSelecionado);
        } else {
          console.error('Nenhum veículo encontrado com o ID especificado.');
        }
      },
      error => {
        console.error('Erro ao obter dados de veículos:', error);
      }
    );
  }
  

  atualizarDataEHora() {
    const agora = new Date();

    // Atualiza a variável Data para a data de hoje no formato YYYY-MM-DD
    this.Data = agora.toISOString().slice(0, 10);

    // Atualiza a variável HoraSaida e HoraChegada para o horário atual no formato HH:MM
    const hora = agora.getHours().toString().padStart(2, '0');
    const minuto = agora.getMinutes().toString().padStart(2, '0');
    this.HoraSaida = `${hora}:${minuto}`;
    this.HoraChegada = `${hora}:${minuto}`;
  }

  onSubmit() {
    // Verificar se todos os campos obrigatórios foram preenchidos
    if (!this.Origem || !this.Data || !this.HoraSaida || !this.KmInicial || !this.IDVeiculo || !this.Destino || !this.HoraChegada || !this.KmFinal || !this.IDMotorista) {
        this.mostrarAlerta2('Erro!', 'Todos os campos são obrigatórios.');
        return;
    }

    if (Number(this.KmInicial) >= Number(this.KmFinal)) {
      this.mostrarAlerta2('Erro!', 'Km Final não pode ser menor ou igual ao Km Inicial.');
      return;
    }
    
    // Aqui você pode implementar a lógica para enviar os dados do formulário
    const body = new FormData();
    body.append('Origem', this.Origem);
    body.append('Data', this.Data);
    body.append('HoraSaida', this.HoraSaida);
    body.append('KmInicial', this.KmInicial);
    body.append('IDVeiculo', this.IDVeiculo);
    body.append('Destino', this.Destino);
    body.append('HoraChegada', this.HoraChegada);
    body.append('KmFinal', this.KmFinal);
    body.append('IDMotorista', this.IDMotorista);

    console.log(this.HoraSaida)

    this.http.post<any>('https://vitalimodas.com/API/Motorista/cadastrar_rota_retroativa.php', body).subscribe(
        response => {
            console.log('Resposta do servidor:', response);
            if (response.message === 'Rota cadastrada com sucesso') {
                this.mostrarAlerta('Sucesso!', 'Rota cadastrada com sucesso.').then(() => {
             
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
async mostrarAlerta2(header: string, message: string) {
  const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
          text: 'OK',
          handler: () => {
            location.assign('rotas')
          }
      }]
  });

  await alert.present();
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


 
}
