import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationListComponent } from './conversation.component';

describe('ConversationComponent', () => {
  let component: ConversationListComponent;
  let fixture: ComponentFixture<ConversationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
