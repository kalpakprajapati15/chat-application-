import { AppComponent } from './app.component';

describe('AppComponent', () => {
  // beforeEach(() => TestBed.configureTestingModule({
  //   imports: [RouterTestingModule],
  //   declarations: [AppComponent]
  // }));

  it('should create the app', () => {
    cy.mount(AppComponent).then((wrapper) => console.log(wrapper.fixture.detectChanges()));
    cy.get('div').next().should('have.class', 'hello');
    cy.get('span').invoke('keyup').next().focus();
    cy.$$
  });

  it(`should have as title 'node_api'`, () => {
    cy.mount(AppComponent).then((wrapper) => {
      const app = wrapper.component;
      expect(app.title).equal('node_api')
    });
  });

  it('should emit event with value 3', () => {
    cy.mount(AppComponent).then((wrapper) => {
      const app = wrapper.component;
      cy.spy(app.emitter, 'emit').as('emitterSpy');
      cy.get('button').click();
      cy.get('@emitterSpy').should('not.be.NaN');
    })
  });
});
