describe('Client', () => {
  before(() => {
    cy.visit('/');
  });

  describe('click styled components link', () => {
    before(() => {
      cy.contains('StyledComponents page').click();
    });

    it('should render styled components HTML', () => {
      const Header = cy.get('h1');

      Header.should('contain', 'Styled Components');
      Header.should('have.css', 'color').and('eq', 'rgb(255, 0, 0)');
    });
  });

  describe('click index link', () => {
    before(() => {
      cy.contains('Home').click();
    });

    it('should render index route HTML', () => {
      cy.get('h1').should('contain', 'Index');
    });
  });
});
