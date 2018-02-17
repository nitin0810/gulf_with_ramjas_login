import { Directive, Input, ElementRef, EventEmitter, Output } from '@angular/core';
import { IonicPage } from "ionic-angular";

declare var google:any;
declare var googleLoaded:any;

@IonicPage({
  priority: 'high'
})
@Directive({
  selector: '[GoogleChart]'
})

export class GoogleChart {

  public _element:any;
  public selectedData:any;

  @Input('chartType') public chartType;
  @Input('chartOptions') public chartOptions: Object;
  // @Input('chartData') public chartData: Object;

  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
  }

  ngOnInit() {
    google.charts.load('current', {'packages':['corechart', 'table']});
  }

  @Input() set chartData(data) {
    setTimeout(() => {
      this.drawGraph(this.chartOptions, this.chartType, data,  this._element);
    }, 1000);
  }
  
  @Output() onSelected = new EventEmitter();

  drawGraph (chartOptions,chartType,chartData,ele) {
    google.charts.setOnLoadCallback(drawChart);
    var that = this;
    function drawChart() {
      var wrapper;
      wrapper = new google.visualization.ChartWrapper({
        chartType: chartType,
        dataTable:chartData ,
        options: chartOptions || {},
        containerId: ele.id
      });
      google.visualization.events.addListener(wrapper, 'ready', onReady);      
      wrapper.draw();
      function onReady() {
        google.visualization.events.addListener(wrapper.getChart(), 'click', selectHandler);
      }
      
      function selectHandler(e) {
        that.selectedData={};
        that.selectedData = {
          wrapper:wrapper,
          chartId:ele,
          e:e
        }
        that.onSelected.emit(that.selectedData);
      }
    }
  }
  reDrawGraph(){
    this.drawGraph(this.chartOptions, this.chartType, this.chartData,  this._element);
  }
}
