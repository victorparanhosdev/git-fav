class Favorites {
  constructor(root) {
    this.app = document.querySelector(root)
    this.body = document.querySelector('main table #tbody')


  }
}

class Gitfav extends Favorites {
  constructor(root) {
    super(root)
    this.dadosRow()
    this.updateRow()
 

  

  }

  dadosRow(){
    this.dados = [{
      nome: 'Victor',
      user: 'victorparanhosdev',
      repositorios: 4252,
      seguidores: 55577
    },
    {
      nome: 'Jose',
      user: 'Sosdev',
      repositorios: 42342,
      seguidores: 55337
    },
  ]



  }

  updateRow(){
    const row = this.createRow()
 



    this.dados.forEach(user => {
     

    })

    this.body.append(row)

  }

  createRow() {

    const tr = `
  <td>
  <img class="img-user" src="https://avatars.githubusercontent.com/u/2254731?v=4" alt="Foto da pessoa"/>
  <div>
    <a class="nome" href="">Nome da Pessoa</a>
    <p class="usuario">/usuariodapessoa</p>
  </div>
  </td>
  <td class="repositorios">242</td>
  <td class="seguidores">41414</td>
  <td>
  <button type="button" class="btn-remover">Remover</button>
  </td>`

    return tr
  }



}




new Gitfav('#app')
