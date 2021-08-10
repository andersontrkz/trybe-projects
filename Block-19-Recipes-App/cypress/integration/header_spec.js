/// <reference types="cypress" />

describe('9 - Implemente os elementos do header na tela principal de receitas, respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids profile-top-btn, page-title e search-top-btn', () => {
    cy.visit('http://localhost:3000/comidas');

    cy.get('[data-testid="profile-top-btn"]');
    cy.get('[data-testid="page-title"]');
    cy.get('[data-testid="search-top-btn"]');
  });
});

describe('10 - Implemente um ícone para a tela de perfil, um título e um ícone para a busca, caso exista no protótipo', () => {
  const hasNoHeader = () => {
    cy.get('[data-testid="profile-top-btn"]').should('not.exist');
    cy.get('[data-testid="page-title"]').should('not.exist');
    cy.get('[data-testid="search-top-btn"]').should('not.exist');
  };

  const hasHeader = (title, withSearchButton = true) => {
    cy.get('[data-testid="profile-top-btn"]')
      .should('have.attr', 'src')
      .should('include', 'profileIcon');

    cy.get('[data-testid="page-title"]').contains(title);

    if (withSearchButton){
      cy.get('[data-testid="search-top-btn"]')
        .should('have.attr', 'src')
        .should('include', 'searchIcon');
    } else {
      cy.get('[data-testid="search-top-btn"]').should('not.exist');
    }
  };

  it('Não tem header na tela de login', () => {
    cy.visit('http://localhost:3000/');

    hasNoHeader();
  });

  it('O header tem os ícones corretos na tela de principal de receitas de comidas', () => {
    cy.visit('http://localhost:3000/comidas');

    hasHeader('Comidas');
  });

  it('O header tem os ícones corretos na tela de principal de receitas de bebidas', () => {
    cy.visit('http://localhost:3000/bebidas');

    hasHeader('Bebidas');
  });

  it('Não tem header na tela de detalhes de uma receita de comida', () => {
    cy.visit('http://localhost:3000/comidas/52771');

    hasNoHeader();
  });

  it('Não tem header na tela de detalhes de uma receita de bebida', () => {
    cy.visit('http://localhost:3000/bebidas/178319');

    hasNoHeader();
  });

  it('Não tem header na tela de receita em processo de comida', () => {
    cy.visit('http://localhost:3000/comidas/52771/in-progress');

    hasNoHeader();
  });

  it('Não tem header na tela de receita em processo de bebida', () => {
    cy.visit('http://localhost:3000/bebidas/178319/in-progress');

    hasNoHeader();
  });

  it('O header tem os ícones corretos na tela de explorar', () => {
    cy.visit('http://localhost:3000/explorar');

    hasHeader('Explorar', false);
  });

  it('O header tem os ícones corretos na tela de explorar comidas', () => {
    cy.visit('http://localhost:3000/explorar/comidas');

    hasHeader('Explorar Comidas', false);
  });

  it('O header tem os ícones corretos na tela de explorar bebidas', () => {
    cy.visit('http://localhost:3000/explorar/bebidas');

    hasHeader('Explorar Bebidas', false);
  });

  it('O header tem os ícones corretos na tela de explorar comidas por ingrediente', () => {
    cy.visit('http://localhost:3000/explorar/comidas/ingredientes');

    hasHeader('Explorar Ingredientes', false);
  });

  it('O header tem os ícones corretos na tela de explorar bebidas por ingrediente', () => {
    cy.visit('http://localhost:3000/explorar/bebidas/ingredientes');

    hasHeader('Explorar Ingredientes', false);
  });

  it('O header tem os ícones corretos na tela de explorar comidas por local de origem', () => {
    cy.visit('http://localhost:3000/explorar/comidas/area');

    hasHeader('Explorar Origem');
  });

  it('O header tem os ícones corretos na tela de perfil', () => {
    cy.visit('http://localhost:3000/perfil');

    hasHeader('Perfil', false);
  });

  it('O header tem os ícones corretos na tela de receitas feitas', () => {
    cy.visit('http://localhost:3000/receitas-feitas');

    hasHeader('Receitas Feitas', false);
  });

  it('O header tem os ícones corretos na tela de receitas favoritas', () => {
    cy.visit('http://localhost:3000/receitas-favoritas');

    hasHeader('Receitas Favoritas', false);
  });
});

describe('11 - Redirecione a pessoa usuária para a tela de perfil ao clicar no botão de perfil', () => {
  it('A mudança de tela ocorre corretamente', () => {
    cy.visit('http://localhost:3000/comidas');

    cy.get('[data-testid="page-title"]').contains('Comidas');

    cy.get('[data-testid="profile-top-btn"]').click();

    cy.get('[data-testid="page-title"]').contains('Perfil');
  });
});

describe('12 - Desenvolva o botão de busca que, ao ser clicado, a barra de busca deve aparecer. O mesmo serve para escondê-la', () => {
  it('Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {
    cy.visit('http://localhost:3000/comidas');

    cy.get('[data-testid="search-input"]').should('not.exist');

    cy.get('[data-testid="search-top-btn"]').click();

    cy.get('[data-testid="search-input"]');
  });

  it('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {
    cy.visit('http://localhost:3000/comidas');

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="search-input"]');

    cy.get('[data-testid="search-top-btn"]').click();
    cy.get('[data-testid="search-input"]').should('not.exist');
  });
});
