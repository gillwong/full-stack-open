describe('Blog app', function () {
  beforeEach(function () {
    const users = [
      {
        username: 'e2e_test',
        name: 'E2E Test User',
        password: '12345678',
      },
      {
        username: 'e2e_test_2',
        name: 'E2E Test User 2',
        password: '12345678',
      },
    ]

    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    for (const user of users) {
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    }
    cy.intercept('GET', '/api/blogs').as('backend')
    cy.visit('/')
    cy.wait('@backend')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('button').contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('username').find('input').type('e2e_test')
      cy.contains('password').find('input').type('12345678')
      cy.get('button').contains('login').click()

      cy.contains('E2E Test User logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('username').find('input').type('e2e_test')
      cy.contains('password').find('input').type('password')
      cy.get('button').contains('login').click()

      cy.contains('wrong username or password').should(
        'have.css',
        'color',
        'rgb(255, 0, 0)',
      )
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login('e2e_test', '12345678')
    })

    it('a blog can be created', function () {
      cy.get('button').contains('new blog').click()
      cy.contains('title').find('input').type('E2E testing blog')
      cy.contains('author').find('input').type('E2E Tester')
      cy.contains('url')
        .find('input')
        .type('https://docs.cypress.io/guides/overview/why-cypress')
      cy.get('button').contains('create').click()

      cy.contains('a new blog E2E testing blog by E2E Tester added')
      cy.contains('E2E testing blog E2E Tester').find('button').contains('view')
    })

    describe('and blogs exist', function () {
      beforeEach(function () {
        const initialBlogs = [
          {
            title: 'The first blog ever!',
            author: 'Bob',
            url: 'https://docs.cypress.io/guides/references/assertions',
            likes: 2,
          },
          {
            title: 'My Second Blog',
            author: 'Bill',
            url: 'https://fullstackopen.com/en/part5/end_to_end_testing',
          },
          {
            title: 'Third and Last Blog...',
            author: 'Jones F.',
            url: 'https://docs.fedoraproject.org/en-US/docs/',
            likes: 4,
          },
        ]

        for (const blog of initialBlogs) {
          cy.createBlog(blog)
        }
      })

      it('a blog can be liked', function () {
        cy.contains('My Second Blog Bill')
          .as('blogToLike')
          .find('button')
          .contains('view')
          .click()

        cy.get('@blogToLike').contains('likes 0')
        cy.get('@blogToLike').find('button').contains('like').click()

        cy.get('@blogToLike').contains('likes 1')
      })

      it('a blog can be removed', function () {
        cy.contains('The first blog ever! Bob')
          .as('blogToRemove')
          .find('button')
          .contains('view')
          .click()

        cy.get('@blogToRemove').find('button').contains('remove').click()

        cy.get('@blogToRemove').should('not.exist')
      })

      it('a blog can be removed only by its creator', function () {
        cy.contains('Third and Last Blog... Jones F.')
          .as('forbiddenBlog')
          .find('button')
          .contains('view')
          .click()
        cy.get('@forbiddenBlog').find('button').contains('remove')

        cy.logout()
        cy.login('e2e_test_2', '12345678')

        cy.get('@forbiddenBlog').find('button').contains('view').click()
        cy.get('@forbiddenBlog').find('button').should('not.contain', 'remove')
      })

      it.only('blogs are sorted by number of likes in ascending order', function () {
        cy.get('[data-cy="blog"]').eq(0).contains('Third and Last Blog...')
        cy.get('[data-cy="blog"]').eq(1).contains('The first blog ever!')
        cy.get('[data-cy="blog"]').eq(2).contains('My Second Blog')

        cy.contains('My Second Blog Bill')
          .as('blogToLike')
          .find('button')
          .contains('view')
          .click()
        for (let i = 0; i < 6; ++i) {
          cy.get('@blogToLike').find('button').contains('like').click()
          cy.wait(200)
        }

        cy.get('[data-cy="blog"]').eq(0).contains('My Second Blog')
        cy.get('[data-cy="blog"]').eq(1).contains('Third and Last Blog...')
        cy.get('[data-cy="blog"]').eq(2).contains('The first blog ever!')
      })
    })
  })
})
