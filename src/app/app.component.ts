import {
  Component,
  VERSION,
  AfterViewInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import moment from 'moment';
import { timeInterval } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  // @ViewChild('el') el: any;
  @ViewChild('el', { static: true }) el: ElementRef;
  @ViewChild('timeDelever', { static: true }) timeDelever: ElementRef;
  name = 'Angular ' + VERSION.major;
  calendar = [];
  maxScrollLeft = 0;
  totalTime;
  refreshIntervalId;

  booking_order = [
    {
      group_id: 'NC-0012',
      order: [
        {
          order_id: 'ORDER-001',
          start_time: moment(),
          end_tine: '2022-07-20T17:00:00.000Z',
        },
        {
          order_id: 'ORDER-002',
          start_time: '2022-07-25T17:00:00.000Z',
          end_tine: '2022-07-27T17:00:00.000Z',
        },
      ],
    },
    {
      group_id: 'NC-0013',
      order: [
        {
          order_id: 'ORDER-001',
          start_time: '2022-07-10T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
      ],
    },
    {
      group_id: 'NC-0014',
      order: [
        {
          order_id: 'ORDER-0016',
          start_time: '2022-07-12T17:00:00.000Z',
          end_tine: '2022-07-15T17:00:00.000Z',
        },
      ],
    },
    {
      group_id: 'NC-0015',
      order: [
        {
          order_id: 'ORDER-001',
          start_time: '2022-07-01T17:00:00.000Z',
          end_tine: '2022-07-12T17:00:00.000Z',
        },
      ],
    },
  ];

  constructor(private cdr: ChangeDetectorRef) {
    const startWeek = moment().startOf('month');
    const endWeek = moment().endOf('month');
    const diffDate = endWeek.diff(startWeek, 'days');
    let calendar = [startWeek];
    for (var week = 0; week < diffDate; week++) {
      calendar.push(moment(startWeek).add(week + 1, 'day'));
    }
    this.calendar = calendar;
  }

  onScroll(el: Event) {
    if (
      this.el.nativeElement.scrollLeft ===
      this.el.nativeElement.scrollWidth - this.el.nativeElement.clientWidth
    ) {
      let lastElement = this.calendar.slice(-1);
      for (var week = 0; week < 10; week++) {
        this.calendar.push(moment(lastElement[0]).add(week + 1, 'day'));
      }
    }
  }
  start() {
    const scale = 72 / (24 * 3600);
    let px = 0;
    this.refreshIntervalId = setInterval(() => {
      px = px + scale;
      console.log(scale * 25);
    }, 25);
  }
  stop() {
    clearInterval(this.refreshIntervalId);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.totalTime =
      moment(this.calendar.slice(-1)[0]).unix() -
      moment(this.calendar[0]).unix();
    // this.scaleTotal =
    console.log(
      'qweqwe',
      moment('2022-07-12T17:00:00.000Z')
        .add(10, 'hours')
        .format('MMMM Do YYYY, h:mm:ss a')
    );
    this.cdr.detectChanges();
  }
}
