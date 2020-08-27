describe('Blog app ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Umberto User',
      username: 'username',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login from is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Umberto User logged in')
    })
    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('foo')
      cy.get('#password').type('laa')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong credentials')
    })
  })



  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('jokublogi')
      cy.get('#author').type('b bloggari')
      cy.get('#link').type('blog.com')
      cy.get('#likes').type('0')
      cy.contains('save').click()
      cy.contains('jokublogi')
      cy.contains('b bloggari')
      cy.contains('show')
    })

    it('a blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('jokublogi')
      cy.get('#author').type('b bloggari')
      cy.get('#link').type('blog.com')
      cy.get('#likes').type('0')
      cy.contains('save').click()
      cy.contains('show').click()
      cy.contains('likes: 0')
      cy.contains('like').click()
      cy.contains('likes: 1')
    })
  })
})