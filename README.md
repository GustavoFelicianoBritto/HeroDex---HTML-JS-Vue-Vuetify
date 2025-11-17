# 🦸‍♂️ Projeto HeroDex - Estudo de Vue.js e Vuetify

Este é um projeto de estudo desenvolvido como parte do curso de **Desenvolvedor Front-End do SENAI Pernambuco**. O objetivo principal é aplicar de forma prática os conhecimentos adquiridos em Vue.js, o framework de componentes Vuetify e o consumo de APIs REST.

O projeto, chamado "HeroDex", consiste em uma aplicação simples que consome uma API de super-heróis, exibe uma lista deles e permite ao usuário visualizar detalhes e participar de uma advinhação de resultado de batalha baseada nos atributos de poder de dois heróis aleatórios.

> **⚠️ Atenção:** Este projeto ainda está em sua fase inicial. O foco até o momento foi na lógica e na funcionalidade com Vue.js. Futuras atualizações incluirão melhorias significativas na estilização, adição de componentes estruturais como Header e Footer, e outras funcionalidades para uma experiência de usuário mais completa e robusta.

---

## 📚 O que eu utilizei e aprendi

O desenvolvimento deste projeto foi uma excelente oportunidade para aprofundar meus conhecimentos nas seguintes áreas e tecnologias:

### Tecnologias Utilizadas
*   **HTML5**
*   **JavaScript (ES6+)**
*   **Vue.js 3** (utilizando a *Composition API*)
*   **Vuetify 3** (para a criação rápida de uma interface com componentes prontos)

### Principais Aprendizados

O foco principal foi entender e aplicar os conceitos fundamentais do desenvolvimento front-end moderno:

-   **Consumo de API REST:** Utilização da função `fetch` do JavaScript para buscar dados de uma fonte externa de forma assíncrona (`async/await`).
-   **Reatividade com Vue.js:** Uso de `ref` para criar variáveis reativas que atualizam a interface do usuário automaticamente quando seus valores mudam.
-   **Ciclo de Vida do Vue:** Aplicação do hook `onMounted` para buscar os dados da API assim que o componente é montado na página.
-   **Renderização Condicional e de Listas:** Uso das diretivas `v-if` para exibir elementos condicionalmente (como a mensagem "carregando") e `v-for` para iterar sobre a lista de heróis e renderizá-los.
-   **Manipulação de Eventos:** Utilização do `@click` para capturar interações do usuário, como abrir um modal de detalhes ou escolher um vencedor na batalha.
-   **Componentização com Vuetify:** Experiência prática com um framework de componentes UI, utilizando elementos como `<v-card>`, `<v-btn>`, `<v-dialog>` e `<v-img>` para construir a interface de forma ágil.

---

## 🌐 API Consultada

Para obter os dados dos heróis, utilizei a **Akabab's SuperHero API**, que fornece um arquivo JSON completo com informações detalhadas sobre centenas de personagens.

-   **Endpoint utilizado:** `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json`

---

## 🚀 Testar o Projeto

Você pode acessar e testar a versão ao vivo do projeto através do link abaixo, hospedado no GitHub Pages:

**>> CLIQUE AQUI PARA ACESSAR O PROJETO <<**

---

## 퓨 Próximos Passos

- [ ] Adicionar um Header e um Footer à aplicação.
- [ ] Criar um campo de busca para filtrar os heróis por nome.
- [ ] Melhorar a responsividade e o design geral das páginas.
- [ ] Refatorar o código para melhor organização e manutenibilidade.
- [ ] Adicionar mais funcionalidades à página de batalha.