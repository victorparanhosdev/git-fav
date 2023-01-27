export class GithubUser {
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