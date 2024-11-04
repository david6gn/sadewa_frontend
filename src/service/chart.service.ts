import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  private charts: { [key: string]: Highcharts.Chart } = {};

  generateChart(containerId: string, name: string): Highcharts.Chart {
    let color: string;
    let line: string;

    switch (name) {
      case "Sensor Suhu":
        color = "#FF5A5A";
        line = "#9D0000";
        break;
      case "Sensor pH":
        color = "#FF5AE5";
        line = "#9D007A";
        break;
      case "Sensor Salinitas":
        color = "#D45AFF";
        line = "#58009D";
        break;
      default:
        color = "#FFB35A";
        line = "#9D5500";
    }

    const chart = new Highcharts.Chart(containerId, {
      chart: {
        type: 'spline',
        height: 150,
        borderRadius: 8,
        marginTop: 20,
        backgroundColor: 'rgba(0, 0, 0, 0)', 
        shadow: {
          color: 'rgba(0, 0, 0, 0.5)', 
          offsetX: 2,                 
          offsetY: 2,                 
          opacity: 0.1,               
          width: 3                   
        },
      },
      title: {
        text: undefined
      },
      xAxis: {
        title: {
          text: undefined,
        },
        margin: 0,
        labels: {
          y: 25,
          style: {
            color: '#FFFFFF',
            fontSize: '12px', 
          }
        }
      },
      yAxis: {
        title: {
          text: undefined, 
        },
        labels: {
          style: {
            color: '#FFFFFF', 
            fontSize: '12px', 
          }
        }
      },
      series: [
        {
          type: 'spline',
          data: [],
          color: line,
          showInLegend: false,
          marker: {
            enabled: true,
            radius: 2,
            fillColor: color,
            lineWidth: 2,
            lineColor: color
          } 
        }
      ],
      credits: {
        enabled: false
      }
    });
    this.charts[containerId] = chart;
    return chart;
  }
  addData(containerId: string, data: number) {
    const now = new Date(); 
    const time = now.toLocaleTimeString();
    const chart = this.charts[containerId]; 
    if (chart && chart.series && chart.series[0]) {
      if (chart.series[0].data.length > 10) {
        chart.series[0].addPoint([time, data], true, true);
      } else {
        chart.series[0].addPoint([time, data], true, false);
      }
    }
  }
}