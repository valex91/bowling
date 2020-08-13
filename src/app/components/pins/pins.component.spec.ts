import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FrameStatus } from '../../services/frame/fram.interface';
import { FrameStub } from '../../services/frame/frame.service.stub';

import { PinsComponent } from './pins.component';

describe('PinsComponent', () => {
  let fixture: ComponentFixture<TestHost>;

  function getImage(): DebugElement {
    return fixture.debugElement.query(By.css('.Pins-image'));
  }

  function getClaim(): DebugElement {
    return fixture.debugElement.query(By.css('.Pins-claim'));
  }

  @Component({
    template: `
      <bowling-pins [bowlingPinsFrame]="frame"></bowling-pins>`
  })
  class TestHost {
    public frame: FrameStub = new FrameStub();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestHost,
        PinsComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHost);
  });

  describe('when rappresenting a default score', () => {
    beforeEach(() => {
      fixture.componentInstance.frame.status = FrameStatus.Default;
      fixture.componentInstance.frame.total = 7;
      fixture.detectChanges();
    });

    it('should display only the 3 pins left', () => {
      expect(fixture.debugElement.queryAll(By.css('.knocked')).length).toBe(7);
    });

    it('should not display the bonus image', () => {
      expect(fixture.debugElement.query(By.css('image'))).toBeFalsy();
    });
  });

  describe('when rappresenting a special score score', () => {
    describe('when rappresenting a strike', () => {
      beforeEach(() => {
        fixture.componentInstance.frame.status = FrameStatus.Strike;
        fixture.detectChanges();
      });

      it('should show the bonus image', () => {
        expect(getImage()).toBeTruthy();
      });

      it('should show the bonus name', () => {
        expect(getClaim().nativeElement.textContent.trim()).toBe('strike');
      });
    });

    describe('when rappresenting a spare', () => {
      beforeEach(() => {
        fixture.componentInstance.frame.status = FrameStatus.Spare;
        fixture.detectChanges();
      });

      it('should show the bonus image', () => {
        expect(getImage()).toBeTruthy();
      });

      it('should show the bonus name', () => {
        expect(getClaim().nativeElement.textContent.trim()).toBe('spare');
      });
    });
  });
});
