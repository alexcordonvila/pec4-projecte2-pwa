import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListRow } from './movie-list-row';

describe('MovieListRow', () => {
  let component: MovieListRow;
  let fixture: ComponentFixture<MovieListRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieListRow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieListRow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
