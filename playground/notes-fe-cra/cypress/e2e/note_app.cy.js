describe('Note app', function() {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'e2etest',
      name: 'E2E Test User',
      password: '12345678',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    cy.intercept('GET', '/api/notes').as('backend')
    cy.visit('')
    cy.wait('@backend')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2023')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
    cy.get('#username').type('e2etest')
    cy.get('#password').type('12345678')
    cy.get('#login-button').click()

    cy.contains('E2E Test User logged in')
  })

  it('login fails with wrong password', function() {
    cy.contains('log in').click()
    cy.get('#username').type('e2etest')
    cy.get('#password').type('wrong password')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'E2E Test User logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'e2etest', password: '12345678' })
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('#note-input').type('a note created by cypress')
      cy.contains('save').click()

      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('it can be made not important', function() {
        cy.contains('second note')
          .parent()
          .find('button')
          .as('theButton')

        cy.get('@theButton').click()

        cy.get('@theButton')
          .should('contain', 'make not important')
      })
    })
  })
})