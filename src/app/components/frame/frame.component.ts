import { Component, Input } from '@angular/core';
import { Frame } from '../../services/frame/frame';

@Component({
  selector: 'bowling-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent {
  @Input()
  public bowlingFrameFrame: Frame;
}
