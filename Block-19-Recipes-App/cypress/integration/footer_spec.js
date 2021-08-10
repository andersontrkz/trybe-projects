/// <reference types="cypress" />

describe('19 - Implemente os elementos do menu inferior respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids footer, drinks-bottom-btn, explore-bottom-btn e food-bottom-btn', () => {
    cy.visit('http://localhost:3000/comidas');

    cy.get('[data-testid="footer"]');
    cy.get('[data-testid="drinks-bottom-btn"]');
    cy.get('[data-testid="explore-bottom-btn"]');
    cy.get('[data-testid="food-bottom-btn"]');
  });
});

describe('20 - Posicione o menu inferior de forma fixa e apresente 3 ícones: um para comidas, um para bebidas e outro para exploração', () => {
  it('O menu inferior deve ficar fixado sempre ao final da página', () => {
    cy.visit('http://localhost:3000/comidas');

    cy.get('[data-testid="footer"]').should('have.css','position', 'fixed');
    cy.get('[data-testid="footer"]').should('have.css','bottom', '0px');
  });

  it('Apresenta os ícones corretos', () => {
    cy.visit('http://localhost:3000/comidas');

    cy.get('[data-testid="drinks-bottom-btn"]')
      .should('have.attr', 'src')
      .should('include', 'drinkIcon');

    cy.get('[data-testid="explore-bottom-btn"]')
      .should('have.attr', 'src')
      .should('include', 'exploreIcon');

    cy.get('[data-testid="food-bottom-btn"]')
      .should('have.attr', 'src')
      .should('include', 'mealIcon');
  });
});

describe('21 - Exiba o menu inferior apenas nas telas indicadas pelo protótipo', () => {
  const hasNoFooter = () => {
    cy.get('[data-testid="footer"]').should('not.exist');
    cy.get('[data-testid="drinks-bottom-btn"]').should('not.exist');
    cy.get('[data-testid="explore-bottom-btn"]').should('not.exist');
    cy.get('[data-testid="food-bottom-btn"]').should('not.exist');
  };

  const hasFooter = () => {
    cy.get('[data-testid="footer"]');
    cy.get('[data-testid="drinks-bottom-btn"]');
    cy.get('[data-testid="explore-bottom-btn"]');
    cy.get('[data-testid="food-bottom-btn"]');
  };

  it('Não tem footer na tela de login', () => {
    cy.visit('http://localhost:3000/');

    hasNoFooter();
  });

  it('Tem footer na tela de principal de receitas de comidas', () => {
    cy.visit('http://localhost:3000/comidas');

    hasFooter();
  });

  it('Tem footer na tela de principal de receitas de bebidas', () => {
    cy.visit('http://localhost:3000/bebidas');

    hasFooter();
  });

  it('Não tem footer na tela de detalhes de uma receita de comida', () => {
    cy.visit('http://localhost:3000/comidas/52771');

    hasNoFooter();
  });

  it('Não tem footer na tela de detalhes de uma receita de bebida', () => {
    cy.visit('http://localhost:3000/bebidas/178319');

    hasNoFooter();
  });

  it('Não tem footer na tela de receita em processo de comida', () => {
    cy.visit('http://localhost:3000/comidas/52771/in-progress');

    hasNoFooter();
  });

  it('Não tem footer na tela de receita em processo de bebida', () => {
    cy.visit('http://localhost:3000/bebidas/178319/in-progress');

    hasNoFooter();
  });

  it('Tem footer na tela de explorar', () => {
    cy.visit('http://localhost:3000/explorar');

    hasFooter();
  });

  it('Tem footer na tela de explorar comidas', () => {
    cy.visit('http://localhost:3000/explorar/comidas');

    hasFooter();
  });

  it('Tem footer na tela de explorar bebidas', () => {
    cy.visit('http://localhost:3000/explorar/bebidas');

    hasFooter();
  });

  it('Tem footer na tela de explorar comidas por ingrediente', () => {
    cy.visit('http://localhost:3000/explorar/comidas/ingredientes');

    hasFooter();
  });

  it('Tem footer na tela de explorar bebidas por ingrediente', () => {
    cy.visit('http://localhost:3000/explorar/bebidas/ingredientes');

    hasFooter();
  });

  it('Tem footer na tela de explorar comidas por local de origem', () => {
    cy.visit('http://localhost:3000/explorar/comidas/area');

    hasFooter();
  });

  it('Tem footer na tela de perfil', () => {
    cy.visit('http://localhost:3000/perfil');

    hasFooter();
  });

  it('Não tem footer na tela de receitas feitas', () => {
    cy.visit('http://localhost:3000/receitas-feitas');

    hasNoFooter();
  });

  it('Não tem footer na tela de receitas favoritas', () => {
    cy.visit('http://localhost:3000/receitas-favoritas');

    hasNoFooter();
  });
});

describe('22 - Redirecione a pessoa usuária para uma lista de cocktails ao clicar no ícone de bebidas', () => {
  it('Redireciona para a rota correta', () => {
    cy.visit('http://localhost:3000/comidas');

    cy.get('[data-testid="drinks-bottom-btn"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/bebidas'));
  });
});

describe('23 - Redirecione a pessoa usuária para a tela de explorar ao clicar no ícone de exploração', () => {
  it('Redireciona para a rota correta', () => {
    cy.visit('http://localhost:3000/comidas');

    cy.get('[data-testid="explore-bottom-btn"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/explorar'));
  });
});

describe('24 - Redirecione a pessoa usuárua para uma lista de comidas ao clicar no ícone de comidas', () => {
  it('Redireciona para a rota correta', () => {
    cy.visit('http://localhost:3000/bebidas');

    cy.get('[data-testid="food-bottom-btn"]').click();
    cy.location().should((loc) => expect(loc.pathname).to.eq('/comidas'));
  });
});
