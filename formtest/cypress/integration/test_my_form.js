describe('A test for the working functionality of the NRS form', () => {
  // init code - ignore
  before(() => {
    cy.visit('https://docs.google.com/forms/d/e/1FAIpQLSdYgTxHLejDk9tYS4FHUVKqXiDMebp1iY28BOVnAPThzgiyjQ/viewform?hl=en').then(() => {
      Cypress.$('html').attr('lang', 'en').find('body').attr('dir', 'ltr');
      Cypress.$('[data-id="_cl"]').attr('href', 'https://www.gstatic.com/_/freebird/_/ss/k=freebird.v.-6ecs5amnrpme.L.W.O/d=1/ct=zgms/rs=AMjVe6gsg2-Q7B5cM4F6Zsp8Xf_J16mO_A');
    });
  });

  // an example test
  it('checks the title on the form page', () => {        
    cy.get('[role="heading"][aria-level="1"]').should('have.text', 'NRS Contact Form');
  });

  it('confirms that there are 4 products to choose from', () => {
	  cy.get('[role="list"][aria-labelledby="i1"]').children().should('have.length', 4);
  });

  it('confirms that if you don\'t choose a product the form does not submit', () => {
    cy.get('.appsMaterialWizButtonEl').click();
    cy.get('[role="alert"][id="i3"]').should('be.visible');
    cy.get('[role="list"][aria-labelledby="i1"]').first().click().wait(1000);
    cy.get('[role="alert"][id="i3"]').should('not.be.visible');
  });

  it('confirms that if you don\'t enter you first name the form does not submit', () => {
    cy.get('.appsMaterialWizButtonEl').click();
    cy.get('[role="alert"][id="i20"]').should('be.visible');
    cy.get('[type="text"][aria-describedby="i19 i20"]').type('Inna').wait(1000);
    cy.get('[role="alert"][id="i20"]').should('not.be.visible');
  });


  it('confirms that if you don\'t enter you last name the form does not submit', () => {
    cy.get('.appsMaterialWizButtonEl').click();
    cy.get('[role="alert"][id="i24"]').should('be.visible');
    cy.get('[type="text"][aria-describedby="i23 i24"]').type('Pery').wait(1000);
    cy.get('[role="alert"][id="i24"]').should('not.be.visible');
  });

  it('confirms that if you don\'t enter a phone number enter an invalid phone number the form does not submit', () => {
    cy.get('.appsMaterialWizButtonEl').click();
    cy.get('[role="alert"][id="i28"]').should('be.visible');
    cy.get('[type="text"][aria-describedby="i27 i28"]').type('abc').wait(1000);
    cy.get('.appsMaterialWizButtonEl').click();
    cy.get('[role="alert"][id="i28"]').should('be.visible');
    cy.get('[role="alert"][id="i28"]').should('have.text', '\u00a0\u00a0\u00a0That is not a valid phone number');
    cy.get('[type="text"][aria-describedby="i27 i28"]').clear().type('0254655').wait(1000);
    cy.get('[role="alert"][id="i28"]').should('not.be.visible');
  });

  it('confirms that if you enter too many characters in the "Tell us how you heard about NRS" field the error "Oops too many letters" appears', () => {
    cy.get('textarea[aria-describedby="i31 i32"]').type('sdfsdvssxdcfvgbhnjxdcftvgybhunjsxdcfgvhbkjnmxdcfvghbjnxdfcgvjhbjnkmxcfgvjhbjncfhgvhjbjnxdfchgvhbjnkm')
    cy.get('[role="alert"][id="i32"]').should('be.visible');
    cy.get('[role="alert"][id="i32"]').should('have.text', '\u00a0\u00a0\u00a0Oops too many letters');
    cy.get('textarea[aria-describedby="i31 i32"]').clear();
  });

  it('confirms that if you don\'t enter an email or enter an invalid email or no email at all the form does not submit and the error "Please supply a valid email address" appears', () => {
    cy.get('.appsMaterialWizButtonEl').click();
    cy.get('[role="alert"][id="i36"]').should('be.visible');
    cy.get('[type="email"][aria-describedby="i35 i36"]').type('ttt').wait(1000);
    cy.get('.appsMaterialWizButtonEl').click();
    cy.get('[role="alert"][id="i36"]').should('be.visible');
    cy.get('[role="alert"][id="i36"]').should('have.text', '\u00a0\u00a0\u00a0Please supply a valid email address');
    cy.get('[type="email"][aria-describedby="i35 i36"]').clear().type('inna@home.com').wait(1000);
    cy.get('[role="alert"][id="i36"]').should('not.be.visible');
  });


  it('confirms that if you don\'t enter "netanel.neuman@idt.net" for the field "Enter the email of the guy who made this form" the form does not submit and the error "" shows', () => {
    cy.get('.appsMaterialWizButtonEl').click();
    cy.get('[role="alert"][id="i40"]').should('be.visible');
    cy.get('[type="text"][aria-describedby="i39 i40"]').type('inna@home.com').wait(1000);
    cy.get('.appsMaterialWizButtonEl').click();
    cy.get('[role="alert"][id="i40"]').should('be.visible');
    cy.get('[role="alert"][id="i40"]').should('have.text', '\u00a0\u00a0\u00a0Sorry that\'s the wrong answer!');
    cy.get('[type="text"][aria-describedby="i39 i40"]').clear().type('netanel.neuman@idt.net').wait(1000);
    cy.get('[role="alert"][id="i40"]').should('not.be.visible');
  });

  it('confirms that if you enter all required information correctly the form submits', () => {
    cy.get('.appsMaterialWizButtonEl').click();
    cy.get('.freebirdFormviewerViewResponseConfirmationMessage').should('have.text', 'Your response has been recorded.');
  });
});
