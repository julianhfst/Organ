import { TestBed } from '@angular/core/testing';

import { UserprofileResolver } from './userprofile.resolver';

describe('UserprofileResolver', () => {
  let resolver: UserprofileResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserprofileResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
