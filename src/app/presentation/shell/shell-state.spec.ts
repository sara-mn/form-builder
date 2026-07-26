import { TestBed } from '@angular/core/testing';

import { ShellState } from './shell-state';

describe('ShellState', () => {
    let service: ShellState;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ShellState);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
