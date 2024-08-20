import { Component } from '@angular/core';
import { MenuController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular'; // Importe do 'storage-angular'


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nome: string = '';
  senha: string = '';

  constructor(
    private menuCtrl: MenuController, 
    private http: HttpClient,
    private alertController: AlertController,
    private storage: Storage // Alterado para 'Storage'
  ) {
    this.initStorage(); // Chama o método para inicializar o armazenamento
  }

  async initStorage() {
    await this.storage.create(); // Cria o banco de dados se ainda não existir
  }

  abrirMenu() {
    this.menuCtrl.open();
  }

  async login() {
    const url = 'https://vitalimodas.com/API/Motorista/login.php'; // URL de login

    try {
        const response = await this.http.get<any>(url, {
            params: {
                login: this.nome,
                senha: this.senha
            }
        }).toPromise();

        const resultado = response; // Resultado da resposta

        if (resultado.ID) {
            await this.storage.set('nome', this.nome);
            await this.storage.set('id', resultado.ID);

            const alert = await this.alertController.create({
                header: 'Sucesso!',
                message: 'Login realizado com sucesso!',
                buttons: ['OK']
            });

            await alert.present();

            setTimeout(() => {
                location.assign('/index');
            }, 2000);
        } else if (resultado.error) {
            const alert = await this.alertController.create({
                header: 'Erro!',
                message: resultado.error,
                buttons: ['OK']
            });

            await alert.present();
        } else {
            const alert = await this.alertController.create({
                header: 'Erro!',
                message: 'Erro desconhecido ao tentar fazer login.',
                buttons: ['OK']
            });

            await alert.present();
        }
    } catch (error) {
        console.error(error);
    }
}

}
