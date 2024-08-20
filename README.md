Documentação do Sistema de Aplicativo de Motoristas
1. Introdução
1.1 Visão Geral
O sistema de aplicativo de motoristas é uma solução integrada que permite o gerenciamento eficiente de motoristas através de um aplicativo móvel e uma plataforma de gerenciamento na intranet. Este documento detalha as funcionalidades, arquitetura, requisitos, e procedimentos operacionais do sistema.
1.2 Objetivo
O objetivo deste sistema é fornecer uma forma mais fácil e pratica para cadastrar rotas e veículos usando o aplicativo móvel
1.3 Escopo
O sistema abrange:
•	Aplicativo móvel para motoristas.
•	Sistema de gerenciamento na intranet.
•	Relatórios e análises de desempenho.
2. Funcionalidades do Sistema
2.1 Aplicativo Móvel para Motoristas
•	Cadastro de Motoristas: Permite aos motoristas se cadastrarem e atualizarem suas informações pessoais.
•	Gerenciamento de Rotas: Visualização de rotas atribuídas, com detalhes de destino e horários.
•	Relatório de Viagens: Registro de viagens completadas, incluindo tempo de viagem e condições do veículo.
2.2 Sistema de Gerenciamento na Intranet
•	Painel de Controle: Visão geral das atividades dos motoristas em tempo real.
•	Gestão de Motoristas: Cadastro, edição, e desativação de motoristas.
•	Gestão de Rotas: Criação, edição, e atribuição de rotas.
•	Monitoramento de Viagens: Rastreamento em tempo real de motoristas em rota.
•	Relatórios e Análise: Geração de relatórios de desempenho, consumo de combustível, e eficiência de rotas.
3. Arquitetura do Sistema
3.1 Visão Geral
O sistema é composto por dois componentes principais: o aplicativo móvel e o sistema de gerenciamento na intranet. Ambos os componentes se comunicam através de APIs RESTful, garantindo a sincronização de dados em tempo real.
3.2 Diagrama de Arquitetura
    
Smartphone → Aplicativo de Motorista → API RESTful → Servidor de Aplicação → Servidor de Banco de Dados
              ↕                                        
    Servidor de Banco de Dados
               ↕                                                                                
     Computadores → Plataforma de Gerenciamento na Intranet → API RESTful → Servidor de Aplicação → Servidor de Banco de Dados
Servidor de Aplicação: vitalimodas.com.br/API/Motoristas
Servidor de Banco de Dados: http://192.168.156.150:81/index/aplicativos.html

3.3 Componentes Principais
•	Servidor de Aplicações: Hospeda as APIs e lógica de negócios.
•	Banco de Dados: Armazena todas as informações relacionadas a motoristas, rotas e viagens.
•	Aplicativo Móvel: Interface de usuário para motoristas.
•	Interface Web: Plataforma de gerenciamento acessível via navegador.
4. Requisitos do Sistema
4.1 Requisitos Funcionais
•	O sistema deve permitir o cadastro e autenticação de motoristas.
•	O sistema deve permitir a atribuição de rotas e monitoramento em tempo real.
•	O sistema deve gerar relatórios periódicos de desempenho.
5. Procedimentos Operacionais
5.1 Instalação do Sistema
Passo 1: Instalar o Aplicativo no celular do motorista 
Passo 2: Criar um usuário para ele na intranet
Passo 3: Realizar treinamento no Motorista

5.2 Atualizações do Sistema
•	Backup: Realizar backup completo antes de qualquer atualização.
•	Deploy: Fazer o deploy das atualizações no servidor de aplicações.
•	Testes: Realizar testes de regressão para garantir a integridade do sistema.
5.3 Suporte e Manutenção
•	Suporte Técnico: Diego, RAMAL 221
6. Segurança
6.1 Autenticação e Autorização
•	Autenticação de Usuários: Realizada via Login e Senha
•	Controle de Acesso: Diferentes níveis de acesso para motoristas e administradores.
6.2 Criptografia
•	Criptografia Inexistente
7. Considerações Finais
Este documento deve ser atualizado conforme o sistema evolui. As mudanças devem ser aprovadas pelo time de desenvolvimento e pela gerência de operações.
8. Documentação para Desenvolvedores
8.1 Visão Geral do Desenvolvimento
Este sistema foi desenvolvido para proporcionar uma solução eficiente de gerenciamento de motoristas, integrando um aplicativo móvel com uma plataforma de gerenciamento na intranet. A arquitetura é baseada em uma comunicação via APIs RESTful entre os diferentes componentes, garantindo escalabilidade e flexibilidade para futuras expansões.
8.2 Tecnologias Utilizadas
•	Frontend Mobile: Desenvolvido em Ionic com Angular, para garantir um design responsivo e uma experiência de usuário intuitiva.
•	Backend: Construído em PHP utilizando as API’s correspondentes:

o	  apagar_abastecimento.php
o	  apagar_motorista.php
o	  apagar_rota.php
o	  apagar_veiculo.php
o	  cadastrar_abastecimento.php
o	  cadastrar_lancamento_carro.php
o	  cadastrar_motorista.php
o	  cadastrar_rota.php
o	  cadastrar_rota_retroativa.php
o	  dados_abastecimento.php
o	  cadastrar_veiculo.php
o	  dados_grafico.php
o	  dados_lancamento_carro.php
o	  dados_rotas.php
o	  dados_segundo_grafico.php
o	  dados_usuarios.php
o	  dados_veiculos.php
o	  editar_motorista.php
o	  editar_rotas.php
o	  editar_veiculos.php
o	  login.php

•	Banco de Dados: MySQL para armazenar informações 
•	Plataforma Web: Utiliza PHP junto com Bootstrap para a interface de gerenciamento na intranet.
8.3 Estrutura de Pastas do Projeto no IONIC
•	AplicativoMt
o	/src
	/app:
	/abastecimento: pagina para realizar lançamentos de abastecimento
	/combustivel: pagina para conferir lançamentos de abastecimento
	/home: pagina de login
	/index: pagina inicial após o login
	/registros: tela para lançar registros de rotas
	/retroativo: tela para lançar rotas retroativas
	/rotas: tela para conferir as rotas respectivas dos ususarios
	/sair: uma rota exclusiva para sair do usuario
8.4 Padrões de Código
•	HardCode:
o	CamelCase para nomes de variáveis e métodos.
o	PascalCase para nomes de classes e modelos.

•	Documentação de Código:
o	Comentários detalhados para métodos críticos.


8.5 Fluxo de Desenvolvimento
•	Ambiente de Desenvolvimento:
o	Configuração do ambiente utilizando IONIC para criar as dependências e páginas.
o	Utilização de Git para controle de versão.
•	Deploy:
o	Deploy realizado via AndroidStudio configurado no capacitor.
o	Scripts de deploy não-automatizados, tendo que realizar manualmente.
8.6 API RESTful
•	Estrutura das Rotas:
o	GET /api/
o	POST /api/
•	Autenticação:
o	Não tem restrição de autenticação para realizar buscas de GET e POST
•	Exemplo de Requisição:
POST https://vitalimodas.com/API/Motoristas/cadastrar_motoristas.php
{
    "user": "João Silva",
    "password": "123.456.789-00",
    "nome": "11 99999-9999",
    "confirmPassword": "11 99999-9999",

}
8.7 Contato para Suporte ao Desenvolvimento
•	Desenvolvedor Líder: Diego de Oliveira
•	Contato: ti.diego@ccbh.com.br
•	Documentação Técnica: Disponível no repositório GitHub, com informações detalhadas sobre as APIs e exemplos de uso.
Data da Última Atualização: 20/08/2024

