import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FrameStatus } from '../../services/frame/fram.interface';
import { FrameStub } from '../../services/frame/frame.service.stub';

import { FrameComponent } from './frame.component';

describe('FrameComponent', () => {
  let fixture: ComponentFixture<TestHost>;

  function getStatus(): DebugElement {
    return fixture.debugElement.query(By.css('.Frame-status'));
  }

  @Component({
    template: `
      <bowling-frame [bowlingFrameFrame]="frame"></bowling-frame>`
  })
  class TestHost {
    public frame: FrameStub = new FrameStub();
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHost, FrameComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHost);
  });

  describe('when displaying a frame', () => {
    let frameElements: Array<DebugElement>;
    beforeEach(() => {
      fixture.componentInstance.frame.points = [1337, 28];
      fixture.detectChanges();
      frameElements = fixture.debugElement.queryAll(By.css('.Frame-bowl'));
    });

    it('should display a the score of each singular bowl', () => {
      expect(frameElements.length).toBe(2);
      expect(frameElements[0].nativeElement.textContent.trim()).toBe('1337');
      expect(frameElements[1].nativeElement.textContent.trim()).toBe('28');
    });
  });

  describe('when the status is default ', () => {
    beforeEach(() => {
      fixture.componentInstance.frame.status = FrameStatus.Default;
      fixture.detectChanges();
    });
    it('should not display any status', () => {
      expect(getStatus().nativeElement.textContent.trim()).toBe('');
    });
  });

  describe('when the status is spare', () => {
    beforeEach(() => {
      fixture.componentInstance.frame.status = FrameStatus.Spare;
      fixture.detectChanges();
    });

    it('should display the spare symbol', () => {
      expect(getStatus().nativeElement.textContent.trim()).toBe('/');
    });
  });

  describe('when the status is strike', () => {
    beforeEach(() => {
      fixture.componentInstance.frame.status = FrameStatus.Strike;
      fixture.detectChanges();
    });

    it('should display the strike symbol', () => {
      expect(getStatus().nativeElement.textContent.trim()).toBe('X');
    });
  });
});
