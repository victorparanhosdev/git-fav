import { GithubUser } from "./githubuser.js"

export class Favorites {
    constructor(root) {
      this.app = document.querySelector(root)
      this.body = document.querySelector('main table #tbody')
      this.load()
      this.updateRow()
      this.onAdd()
    }
  }
  
export class Gitfav extends Favorites {
    constructor(root) {
      super(root)
    }
  
    load() {
      this.dados = JSON.parse(localStorage.getItem('@git:')) || []
    }
    save() {
      localStorage.setItem('@git:', JSON.stringify(this.dados))
    }
  
    async username(nome) {
     
      try{

        const exits = this.dados.find(dados => dados.user === nome.toLowerCase())

        if(exits){
          throw new Error('Usuário já cadastrado')
        }
        
        const user = await GithubUser.search(nome)

        if(user.user === undefined) {
          throw new Error('Usuário não encontrado!')
        }
  
        this.dados = [user, ...this.dados]
        this.updateRow()
        this.save()

      } catch(error){
        alert(error.message)

      }


    }
  
    onAdd() {
      const btnFav = document.querySelector('#btn-fav')
  
      btnFav.onclick = () => {
        const { value } = document.querySelector('#box-search')
          this.username(value)
          document.querySelector('#box-search').value = ''
          document.querySelector('#box-search').focus()
        }

      
  
      window.addEventListener('keydown', event => {
        if (event.key == 'Enter') {
          const { value } = document.querySelector('#box-search')
            this.username(value)
            document.querySelector('#box-search').value = ''
            document.querySelector('#box-search').focus()
          }
        }
      )
    }
  
    createRowEmpty() {
      const trEmpty = document.createElement('tr')
      trEmpty.innerHTML = `
                <td colspan="4">
                <div>
                  <img class="img-empty" src="./assets/Estrela.svg" alt="">
                <p>Nenhum favorito ainda</p>
              </div>
              </td>
  `
  
      trEmpty.classList.add('empty')
      return trEmpty
    }
    updateRow() {
      this.removeAll()
  
      const Confere = this.dados.length == 0
  
      if (Confere) {
        const tr = this.createRowEmpty()
        this.body.append(tr)
        return
      }
  
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
          if (isOk) {
            this.delete(user)
          }
        })
  
        this.body.append(row)
      })
    }
    removeAll() {
      this.body.querySelectorAll('tr').forEach(tr => tr.remove())
    }
    delete(value) {
      const filter = this.dados.filter(user => {
        return user.user !== value.user
      })
      this.dados = filter
  
      this.updateRow()
      this.save()
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
  