import { TestBed } from '@angular/core/testing';
import { AngularD3CloudService } from './angular-d3-cloud.service';

describe('AngularD3CloudService', () => {
    let service: AngularD3CloudService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [AngularD3CloudService],
        }).compileComponents();

        service = TestBed.inject(AngularD3CloudService);
    });

    test('should create the service', () => {
        expect(service).toBeTruthy();
    });
});
