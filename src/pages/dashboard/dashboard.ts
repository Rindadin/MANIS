import { Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
// import{ Chart } from 'chart.js';
import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  
  
  public lineChartData:Array<any> = [
    {data: [100, 80, 280, 410, 560], label: 'Structure'},
    {data: [240, 285, 300, 340, 380], label: 'Electrical'},
    {data: [300, 360, 380, 400, 410], label: 'Mechanical'},
    {data: [500, 540, 510, 520, 560], label: 'Instrument'}
    
  ];
  public lineChartLabels:Array<any> = ['Admin', 'Raw Water', 'Treatment Process', 'Sludge Treatment', 'Power Supply'];
  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // blue violet
      backgroundColor: 'rgba(148,159,177,0)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // chocolate
      backgroundColor: 'rgba(210,105,30,0.2)',
      borderColor: 'rgba(210,105,30,1)',
      pointBackgroundColor: 'rgba(210,105,30,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(210,105,30,1)'
    },
    { // indianred
      backgroundColor: 'rgba(205,92,92,0.2)',
      borderColor: 'rgba(205,92,92,1)',
      pointBackgroundColor: 'rgba(205,92,92,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(205,92,92,0.8)'
    },

    { // dark turqoise
      backgroundColor: 'rgba(0,206,209,0.2)',
      borderColor: 'rgba(0,206,209,1)',
      pointBackgroundColor: 'rgba(0,206,209,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0,206,209,1)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }

  // Doughnut
  public doughnutChartLabels:string[] = ['Instrument', 'Mechanical', 'Electrical', 'Structure'];
  public doughnutChartData:number[] = [400, 200, 200, 200];
  public doughnutChartType:string = 'doughnut';

// events
public chartClicke(e:any):void {
  console.log(e);
}

public chartHovere(e:any):void {
  console.log(e);
}

public barChartOptions:any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartLabels:string[] = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
public barChartType:string = 'bar';
public barChartLegend:boolean = true;

public barChartData:any[] = [
  {data: [520,450,310,780,560,460,310,420,580,601,710,900], label:'Instrument'},
  {data: [401,250,290,580,480,370,300,380,390,401,720,600], label:'Mechanical'}

];

// events
public chartClick(e:any):void {
  console.log(e);
}

public chartHover(e:any):void {
  console.log(e);
}


  
constructor (public navCtrl: NavController, public chart: ChartsModule){}
  IonViewDidLoad(){
    console.log('ioniViewLoad DashboardPage');
   
      
    }
    
  }

