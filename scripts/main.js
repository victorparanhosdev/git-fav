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
      user: 'jose',
      repositorios: 42342,
      seguidores: 55337
    },
    {
      nome: 'biubiu',
      user: 'dvdnotfound',
      repositorios: 42342,
      seguidores: 55337
    },
  ]

  

  }


  updateRow(){

    this.removeAll()

    this.dados.forEach(user => {
      const row = this.createRow()
      row.querySelector('.img-user').src = `https://github.com/${user.user}.png`
      row.querySelector('.img-user').alt = `Foto de ${user.nome}`
      row.querySelector('.nome').textContent = user.nome
      row.querySelector('.nome').href = `https://github.com/${user.user}`
      row.querySelector('.usuario').textContent = `/${user.user}`
      row.querySelector('.repositorios').textContent = `${user.repositorios}`
      row.querySelector('.seguidores').textContent = `${user.seguidores}`
      row.querySelector('.btn-remover').addEventListener('click', () => {
        const isOk = confirm('Tem certeza que deseja excluir ?')
        if(isOk){
          this.delete(user)
        }
      
      
      })  

      this.body.append(row)
    
    
    })

    
  }

  removeAll(){
    this.body.querySelectorAll('tr').forEach(tr => tr.remove())
  }

  delete(value){
    
    const filter = this.dados.filter(user => {
      return user.user !== value.user
    })
    this.dados = filter
 
    this.updateRow()
   
    

  }



  createRow() {

    const tr = document.createElement('tr')

    tr.innerHTML = `
  <td>
  <img class="img-user" src="https://avatars.githubusercontent.com/u/2254731?v=4" alt="Foto da pessoa"/>
  <div>
    <a class="nome" target="_blank" href="">Nome da Pessoa</a>
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
