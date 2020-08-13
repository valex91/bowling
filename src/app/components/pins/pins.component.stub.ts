import { Component, Input } from '@angular/core';
import { Frame } from '../../services/frame/frame';
import { IPinsComponent } from './pins.component.interface';

@Component({
  selector: 'bowling-pins',
  template: ''
})
export class PinsComponentStub implements IPinsComponent {
  @Input()
  public bowlingPinsFrame: Frame;
}
