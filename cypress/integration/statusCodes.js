describe('Status Codes', () => {
  it('/ - should return 200', () => {
    cy.request('/').then(({ status }) => {
      expect(status).to.eq(200);
    });
  });

  it('/apollo - should return 200', () => {
    cy.request('/apollo').then(({ status }) => {
      expect(status).to.eq(200);
    });
  });

  it('/styledComponents - should return 200', () => {
    cy.request('/styledComponents').then(({ status }) => {
      expect(status).to.eq(200);
    });
  });

  it('/notFound - should return 404', () => {
    cy.request({
      url: '/notFound',
      failOnStatusCode: false,
    }).then(({ status }) => {
      expect(status).to.eq(404);
    });
  });
});
