import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AlertController, AlertInput } from '@ionic/angular';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
})
export class RegistrosPage implements OnInit {
  registros: any[] = [];
  data: string = '';
  data2: string = '';
  IDMotorista: string = '';

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.get_id()
    this.filtrarRegistros();
  }

  async get_id() {

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
    const url = `https://vitalimodas.com/API/Motorista/dados_rotas.php?idMotorista=${this.IDMotorista}`;
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
  async editar(id_editar: number) {
    console.log('editar: ' + id_editar);

    const url = `https://vitalimodas.com/API/Motorista/dados_rotas.php?id=${id_editar}`;
    try {
      const response = await this.http.get<any>(url).toPromise();

      if (response.message !== 'Nenhum dado encontrado') {
        console.log(response);
        const alertInputs: AlertInput[] = [
          {
            label: 'Destino',
            name: 'Destino',
            type: 'text',
            disabled: true,
            value: response[0].ID, // Adicionar o valor do Destino da response
          },
          {
            label: 'Data',
            name: 'Data',
            type: 'date',
            value: response[0].Data, // Adicionar o valor da Data da response
          },
          {
            label: 'Destino',
            name: 'Destino',
            type: 'text',
            value: response[0].Destino, // Adicionar o valor do Destino da response
          },
          {
            label: 'Hora de Chegada',
            name: 'HoraChegada',
            type: 'time',
            value: response[0].HoraChegada, // Adicionar o valor da HoraChegada da response
          },
          {
            label: 'Hora de Saída',
            name: 'HoraSaida',
            type: 'time',
            value: response[0].HoraSaida, // Adicionar o valor da HoraSaida da response
          },
          {
            label: 'Km Final',
            name: 'KmFinal',
            type: 'text',
            value: response[0].KmFinal,
            disabled: true, // Adicionar o valor do KmFinal da response
          },
          {
            label: 'Km Inicial',
            name: 'KmInicial',
            type: 'text',
            value: response[0].KmInicial,
            disabled: true, // Adicionar o valor do KmInicial da response
          },
          {
            label: 'Nome do Carro',
            name: 'Nome_Carro',
            type: 'text',
            disabled: true,
            value: response[0].Nome_Carro, // Adicionar o valor do Nome_Carro da response
          },
          {
            label: 'Nome do Motorista',
            name: 'Nome_Motorista',
            type: 'text',
            disabled: true,
            value: response[0].Nome_Motorista, // Adicionar o valor do Nome_Motorista da response
          },
          {
            label: 'Origem',
            name: 'Origem',
            type: 'text',
            disabled: true,
            value: response[0].Origem, // Adicionar o valor do Origem da response
          },
        ];

        const alert = await this.alertController.create({
          header: 'Editar Registro',
          inputs: alertInputs, // Usar os inputs preenchidos com os dados da response
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Edição cancelada');
              },
            },
            {
              text: 'Salvar',
              handler: async (data) => {
                console.log('Inputs do alerta:', data);

                try {
                  // Construa o corpo da requisição com os campos
                  const requestBody = {
                    Data: data.Data,
                    Destino: data.Destino,
                    HoraChegada: data.HoraChegada,
                    HoraSaida: data.HoraSaida,
                    KmFinal: data.KmFinal,
                    KmInicial: data.KmInicial,
                    Nome_Carro: data.Nome_Carro,
                    Nome_Motorista: data.Nome_Motorista,
                    Origem: data.Origem,
                    ID: id_editar
                  };

                  console.log(requestBody);

                  // Enviar os dados para a API
                  const updatedData = await this.http.post<any>('https://vitalimodas.com/API/Motorista/editar_rotas.php', requestBody).toPromise();
                  console.log('Resposta da API:', updatedData);
                } catch (error) {
                  console.error('Erro ao enviar dados para a API:', error);
                }
              },
            },
          ],
        });


        await alert.present();
      } else {
        console.error('Nenhum dado encontrado para o ID:', id_editar);
      }
    } catch (error) {
      console.error('Erro ao obter dados do registro:', error);
    }
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

  abastecimento() {
    location.assign('/abastecimento');
  }
  combustivel() {
    location.assign('/combustivel');
  }
  sair() {
    location.assign('/sair');
  }
}
