export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'Essa é a documentação da API feita por Douglas Diniz Carvalho no curso da Udemy de NodeJs usando Typescript, TDD, Clean Architecture e seguindo os princípios do SOLID e Design Patterns.',
    version: '1.0.0',
    contact: {
      name: 'Douglas Diniz Carvalho',
      email: 'douglasdnzcarvalho@gmail.com',
      url: 'https://www.linkedin.com/in/douglasdcarvalho/'
    },
    license: {
      name: 'GPL-3.0-or-later',
      url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
    }
  },
  servers: [{
    url: '/api',
    description: 'Servidor Principal'
  }],
  tags: [{
    name: 'Login',
    description: 'APIs relacionadas a Login'
  }, {
    name: 'Enquete',
    description: 'APIs relacionadas a Enquete'
  }]
}
