
describe('check login',function (){
    it.only('logs in',function(){
        cy.visit('http://localhost:3000')
        cy.get('#email')
            .type('noel.alam2323@gmail.com')
        cy.get('#password')
            .type('test123123')
        cy.get('.btn').click()
    })
})