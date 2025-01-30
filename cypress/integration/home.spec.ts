describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have all buttons on the home page', () => {
    cy.visit('/');
    cy.get('button').contains('Importera CSV').should('exist');
    cy.get('button').contains('Spara Mall').should('exist');
    cy.get('button').contains('Mallar').should('exist');
  });

  it('should import a file via the "Importera CSV" button and verify the content', () => {
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
    cy.get('table').should('contain', '6349');
    cy.get('table').should('contain', '2023-01-18');
    cy.get('table').should('contain', '705');
    cy.get('table').should('contain', '80,00');
    cy.screenshot();

    // Click on the first header in the table
    cy.get('table thead tr th').first().click();
    
    // Press arrow down and then enter
    cy.get('body').type('{downarrow}');
    cy.get('body').type('{enter}');
    cy.screenshot();

    // Testing Utbetalningsdatum 

    cy.get('button').contains('Utbetalningsdatum').click();
    cy.get('.react-datepicker').should('be.visible');
    cy.get('.react-datepicker__day--012').should('be.visible').click();
    cy.screenshot();

    // Testing Första dagen i föregående månad
    cy.get('input.input-custom[placeholder="Första dagen i föregående månad"]').clear().type('2024-01-05');
    cy.get('input.input-custom[placeholder="Första dagen i föregående månad"]').should('have.value', '2024-01-05');

    // Testing Sista dagen i föregående månad
    cy.get('input.input-custom[placeholder="Sista dagen i föregående månad"]').clear().type('2024-01-29');
    cy.get('input.input-custom[placeholder="Sista dagen i föregående månad"]').should('have.value', '2024-01-29');
    cy.screenshot();

    
  });
});