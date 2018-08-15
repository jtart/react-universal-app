describe('Routing', () => {
  describe('server-side requests', () => {
    describe('routes that exist', () => {
      it('should return a 200', () => {
        const routes = ['/', 'apollo', 'styledComponents'];
        routes.forEach(route => {
          cy.request(route).then(({ status }) => {
            expect(status).to.eq(200);
          });
        });
      });
    });

    describe('routes that does not exist', () => {
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
});
