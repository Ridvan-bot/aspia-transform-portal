const indexToText = (index: number): string => {
  const textMap = [
    'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 
    'seventh', 'eighth', 'ninth', 'tenth', 'eleventh', 'twelfth', 
    'thirteenth', 'fourteenth', 'fifteenth', 'sixteenth', 'seventeenth', 
    'eighteenth', 'nineteenth', 'twentieth'
  ];
  
  return textMap[index] || `${index + 1}th`;
};

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have all buttons on the home page', () => {
    cy.get('button').contains('Importera Fil').should('exist');
    cy.get('button').contains('Spara Mall').should('exist');
    cy.get('button').contains('Importera Mappning').should('exist');
  });

  const files = [
    'test.csv',
    'noheader.csv',
    'noheader_tilde.csv',
    'noheader_space.csv',
    'noheader_pipe.csv',
    'noheader_comma.csv',
    'noheader_tab.csv',
    'header_comma.csv',
    'header_pipe.csv',
    'header_space.csv',
    'header_tab.csv',
    'header_tilde.csv',
    'header.csv',
    'TestImport_unika_headers.csv',
    'TestImport_utan_header.csv',
  ]

  files.forEach((fileName) => {
  it('should import a file via the "Importera fil" button and verify the content', () => {
    const fileType = 'text/csv';
    
    let scroll

    cy.fixture(fileName).then(fileContent => {
      const rowCount = fileContent.split('\r\n').length;
      if (rowCount > 2) {
        scroll = true
      }
      else {
        scroll = false
      }

      cy.get('input[data-test="data-test-id-importera-fil"]').attachFile({
        fileContent,
        fileName,
        mimeType: fileType
      });
    });


    cy.get('button').contains('Fil').click();
    // Log all headers and count them
    cy.get('table thead tr th').each((header, index) => {
    }).then((headers) => {
      const headerCount = headers.length;

      // Click each header and select the corresponding option from the dropdown
      headers.each((index, header) => {


        switch (fileName) {
          case 'test.csv':
            console.log('Test case for test.csv');
            cy.get('table thead tr th').eq(0).click();
            cy.get('table thead tr th').eq(0).find('select').select("Belopp");
            cy.get('table thead tr th').eq(1).click();
            cy.get('table thead tr th').eq(1).find('select').select("Fr.o.m. datum");
            cy.get('table thead tr th').eq(2).click();
            cy.get('table thead tr th').eq(2).find('select').select("Konteringsnivå 1");
            cy.get('table thead tr th').eq(3).click();
            cy.get('table thead tr th').eq(3).find('select').select("Löneartsnr");
            cy.get('table thead tr th').eq(4).click();
            cy.get('table thead tr th').eq(4).find('select').should('be.visible');
            cy.get('table thead tr th').eq(4).find('select').select("Tomt");
            cy.get('table thead tr th').eq(5).click();
            cy.get('table thead tr th').eq(5).find('select').should('be.visible');
            cy.get('table thead tr th').eq(5).find('select').select("Antal");
            cy.get('table thead tr th').eq(6).click();
            cy.get('table thead tr th').eq(6).find('select').should('be.visible');
            cy.get('table thead tr th').eq(6).find('select').select("A-pris");
            cy.get('table thead tr th').eq(7).click();
            cy.get('table thead tr th').eq(7).find('select').select("Meddelande");
        
            cy.get('input.input-custom[placeholder="Ange mallens namn"]').clear().type('cypressTest');
            cy.get('button').contains('Spara Mall').click();
            break;
          case 'noheader.csv':
          case 'noheader_tilde.csv':
          case 'noheader_space.csv':
          case 'noheader_pipe.csv':
          case 'noheader_comma.csv':
            console.log('Test case for noheader_*.csv');
            let scroll
            cy.get('input.input-custom[placeholder="Sök bland mallar"]').clear().type('cypressTest');
            cy.get('ul').contains('li', 'cypressTest').click();
            cy.get('button').contains('Importera Mappning').click();
            cy.get('input[data-test="data-test-id-importera-mappning"]').attachFile('mappning.xls');
            cy.get('select.input-custom[title="Välj Kolumn för mappning"]').select('Löneartsnr');
            
             // Testing Utbetalningsdatum 
            cy.get('button').contains('Utbetalningsdatum').click();
            cy.get('.react-datepicker').should('be.visible');
            if (scroll == true) {
            cy.scrollTo('bottom');
            }
            cy.get('.react-datepicker__day--003').should('be.visible').click();
                    // Testing Första dagen i föregående månad
            cy.get('input.input-custom[placeholder="Första dagen i föregående månad"]').clear().type('2024-01-05');
            cy.get('input.input-custom[placeholder="Första dagen i föregående månad"]').should('have.value', '2024-01-05');
    
            // Testing Sista dagen i föregående månad
            cy.get('input.input-custom[placeholder="Sista dagen i föregående månad"]').clear().type('2024-01-29');
            cy.get('input.input-custom[placeholder="Sista dagen i föregående månad"]').should('have.value', '2024-01-29');
            cy.get('button').contains('Exportera').click();
            cy.screenshot()
              break;
        
          default:

    // Testing Utbetalningsdatum 
    cy.get('button').contains('Utbetalningsdatum').click();
    cy.get('.react-datepicker').should('be.visible');
    if (scroll == true) {
    cy.scrollTo('bottom');
    }
    cy.get('.react-datepicker__day--003').should('be.visible').click();

    // Testing Sök bland Mallar
    cy.get('input.input-custom[placeholder="Ange mallens namn"]').clear().type('TestTemplet');
    cy.get('button').contains('Spara Mall').click();
    cy.get('input.input-custom[placeholder="Sök bland mallar"]').clear().type('TestTemplet');
    cy.get('ul').contains('li', 'TestTemplet').click();

    // Testing Importera Mappning
    cy.get('button').contains('Importera Mappning').click();
    cy.get('input[data-test="data-test-id-importera-mappning"]').attachFile('mappning.xls');
    cy.get('select.input-custom[title="Välj Kolumn för mappning"]').select('Konteringsnivå 4');

        // Testing Första dagen i föregående månad
        cy.get('input.input-custom[placeholder="Första dagen i föregående månad"]').clear().type('2024-01-05');
        cy.get('input.input-custom[placeholder="Första dagen i föregående månad"]').should('have.value', '2024-01-05');
    
        // Testing Sista dagen i föregående månad
        cy.get('input.input-custom[placeholder="Sista dagen i föregående månad"]').clear().type('2024-01-29');
        cy.get('input.input-custom[placeholder="Sista dagen i föregående månad"]').should('have.value', '2024-01-29');

    
    // Click Exportera button
    cy.get('button').contains('Exportera').click();
    cy.screenshot();
            break;
        }


      });
    });

  });
  });
});