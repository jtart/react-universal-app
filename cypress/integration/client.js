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

  describe('click apollo link', () => {
    before(() => {
      cy.contains('Apollo page').click();
    });

    it('should render apollo route HTML', () => {
      cy.get('h1').should('contain', 'GraphQL w/ Apollo');

      cy.get('ul')
        .children()
        .should('have.length', 5);
    });
  });

  describe('click home link', () => {
    before(() => {
      cy.contains('Home').click();
    });

    it('should render index route HTML', () => {
      cy.get('h1').should('contain', 'Index');
    });
  });
});
