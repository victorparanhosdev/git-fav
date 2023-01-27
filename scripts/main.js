class GithubUser {
  static async search(nome) {
    const endpoint = `https://api.github.com/users/${nome}`
    return fetch(endpoint)
      .then(response => response.json())
      .then(({ name, login, public_repos, followers }) => ({
        nome: name,
        user: login,
        repositorios: public_repos,
        seguidores: followers
      }))
  }
}
class Favorites {
  constructor(root) {
    this.app = document.querySelector(root)
    this.body = document.querySelector('main table #tbody')
    this.dadosRow()
    this.updateRow()
    this.onAdd()
  }
}

class Gitfav extends Favorites {
  constructor(root) {
    super(root)
  }

  dadosRow() {
    this.dados = JSON.parse(localStorage.getItem('@git:')) || []
  }
  save() {
    localStorage.setItem('@git:', JSON.stringify(this.dados))
  }

  async username(nome) {
    const user = await GithubUser.search(nome)
    this.dados = [user, ...this.dados]
    this.updateRow()
    this.save()
  }

  onAdd() {
    const btnFav = document.querySelector('#btn-fav')

    btnFav.onclick = () => {
      const { value } = document.querySelector('#box-search')
      this.username(value)
      document.querySelector('#box-search').value = ''
    }

    window.addEventListener('keydown', event => {
      if (event.key == 'Enter') {
        const { value } = document.querySelector('#box-search')
        if (value == '') {
          alert('Por favor Preencha os dados')
        } else {
          this.username(value)
          document.querySelector('#box-search').value = ''
        }
      }
    })
  }

  createRowEmpty() {
    const trEmpty = document.createElement('tr')
    trEmpty.innerHTML = `
              <td>
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

new Gitfav('#app')
