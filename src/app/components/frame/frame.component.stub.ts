import { Component, Input } from '@angular/core';
import { Frame } from '../../services/frame/frame';
import { IFrameComponent } from './frame.component.interface';

@Component({
  selector: 'bowling-frame'
})
export class FrameComponentStub implements IFrameComponent {
  @Input()
  public bowlingFrameFrame: Frame;
}
