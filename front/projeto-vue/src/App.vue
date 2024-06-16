<template>
  <div id="app">

<nav>
  <div class="nav-wrapper blue darken-1">
    <a href="#" class="brand-logo right">Registro de Motos</a>
  </div>
</nav>

<div class="container">

  <form @submit.prevent="salvar">

      <label>Modelo</label>
      <input type="text" placeholder="modelo" v-model="produto.nome">
      <label>Cor</label>
      <input type="text" placeholder="cor" v-model="produto.cor">
      <label>Valor</label>
      <input type="text" placeholder="valor" v-model="produto.valor">
      <label>Status</label>
      <input type="text" placeholder="status" v-model="produto.status">

      <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

  </form>

  <table>

    <thead>

      <tr>
        <th>CÓDIGO</th>
        <th>MODELO DA MOTO</th>
        <th>COR</th>
        <th>VALOR</th>
        <th>STATUS</th>
      </tr>

    </thead>

    <tbody>

      <tr v-for="produto of produtos" :key="produto.id">

        <td>{{produto.id}}</td>
        <td>{{produto.modelo}}</td>
        <td>{{produto.cor}}</td>
        <td>{{produto.valor}}</td>
        <td>{{produto.status}}</td>
        <td>
          <button class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
          <button class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
        </td>

      </tr>

    </tbody>
  
  </table>

</div>

</div>
</template>

<script>

import Produto from './services/produtos'

export default {

  data(){
    return {
      produto: {
        id: '',
        modelo: '',
        cor: '',
        valor: '',
        status: ''
      },
      produtos: []
    }
  },

  mounted() {
    this.listar()
  },

  methods: {
    listar(){
      Produto.listar().then(resposta => {
      this.produtos = resposta.data
    })
    },
    salvar (){
      Produto.salvar(this.produto).then(
        this.produto = {},
        alert('Salvo com sucesso!'),
        this.listar()
      ).catch(e=> {
        console.log(e.response.data.errors)}
      )}
    },

  
  
}

</script>

<style>

</style>
