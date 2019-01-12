describe('Server', () => {
  describe('index route', () => {
    it('should return HTML', () => {
      cy.visit('/');
      cy.get('h1').should('contain', 'Index');
      cy.title().should('contain', 'Index');
    });
  });

  describe('styledComponents route', () => {
    it('should return HTML that is styled', () => {
      cy.visit('/styledComponents');

      const Header = cy.get('h1');

      Header.should('contain', 'Styled Components');
      Header.should('have.css', 'color').and('eq', 'rgb(255, 0, 0)');
    });
  });

  describe('non-existent route', () => {
    it('should return a 404', () => {
      cy.request({
        url: '/notFound',
        failOnStatusCode: false,
      }).then(({ status }) => {
        expect(status).to.eq(404);
      });
    });
  });
});
