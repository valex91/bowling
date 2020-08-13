import { Component, Input } from '@angular/core';
import { FrameStatus } from '../../services/frame/fram.interface';
import { Frame } from '../../services/frame/frame';
import { IPinsComponent } from './pins.component.interface';

@Component({
  selector: 'bowling-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss']
})
export class PinsComponent implements IPinsComponent {
  public readonly frameStatus: typeof FrameStatus = FrameStatus;

  @Input()
  public bowlingPinsFrame: Frame;

  public getKnockedStatus(index: number): string {
    return index <= this.bowlingPinsFrame.total ? 'knocked' : '';
  }
}
