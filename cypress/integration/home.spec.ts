describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should have all buttons on the home page', () => {
      cy.get('button').contains('Importera CSV').should('exist');
      cy.get('button').contains('Spara Mall').should('exist');
      cy.get('button').contains('Mallar').should('exist');
    });
  
    it('should import a file via the "Importera CSV" button', () => {
      const fileName = 'test.csv';
      const fileType = 'text/csv';
  
      cy.fixture(fileName).then(fileContent => {
        cy.get('input[type="file"]').attachFile({
          fileContent,
          fileName,
          mimeType: fileType
        });
      });
  
      cy.get('button').contains('Importera CSV').click();
      cy.get('div').contains(`Filen ${fileName} har blivit importerad`).should('exist');
    });
  });