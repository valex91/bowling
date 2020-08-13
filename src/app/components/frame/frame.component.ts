import { Component, Input } from '@angular/core';
import { FrameStatus } from '../../services/frame/fram.interface';
import { Frame } from '../../services/frame/frame';
import { IFrameComponent } from './frame.component.interface';

@Component({
  selector: 'bowling-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements IFrameComponent {
  private readonly _statusMap: Record<FrameStatus, string> = {
    [FrameStatus.Default]: '',
    [FrameStatus.Spare]: '/',
    [FrameStatus.Strike]: 'X',
  };

  @Input()
  public bowlingFrameFrame: Frame;

  public getStatusSign(status: FrameStatus): string {
    return this._statusMap[status];
  }
}
