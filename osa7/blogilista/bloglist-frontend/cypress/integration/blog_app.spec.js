describe('Blog app ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Umberto User',
      username: 'username',
      password: 'password',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login from is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('username')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
    })

    it('a blog can be created', function () {
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

    it('a blog can be liked', function () {
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

    it('a blog can be deleted', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('jokublogi')
      cy.get('#author').type('b bloggari')
      cy.get('#link').type('blog.com')
      cy.get('#likes').type('0')
      cy.contains('save').click()
      cy.contains('jokublogi')
      cy.contains('show').click()
      cy.contains('remove').click()
      cy.get('.infoText').contains('Deleted jokublogi')
      cy.contains('jokublogi').should('not.exist')
    })

    it('blogs are sorted by likes', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('foo')
      cy.get('#author').type('b bloggari')
      cy.get('#link').type('blog1.com')
      cy.get('#likes').type('0')
      cy.contains('save').click()

      cy.wait(1000)

      cy.get('#title').type('laa')
      cy.get('#author').type('b bloggari')
      cy.get('#link').type('blog2.com')
      cy.get('#likes').type('2')
      cy.contains('save').click()

      cy.wait(1000)

      cy.get('#title').type('lorem ipsum')
      cy.get('#author').type('b bloggari')
      cy.get('#link').type('blog3.com')
      cy.get('#likes').type('10000')
      cy.contains('save').click()

      cy.wait(1000)

      const orderedTitles = ['lorem ipsum b bloggari ', 'laa b bloggari ', 'foo b bloggari ']
      cy.get('.blog-title').should('have.length', 3)
      const titleList = []
      cy.get('.blog-title').each((el) => titleList.push(el.text()))
      cy.wait(3000).then(()=> {
        expect(titleList).to.deep.eq(orderedTitles)} )
    })
  })
})
