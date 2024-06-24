import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {TuiInputModule, TuiTagModule} from '@taiga-ui/kit';
import {TuiAlertService, TuiButtonModule, TuiHintModule, TuiModeModule, TuiSvgModule} from '@taiga-ui/core';
import {TuiTableModule} from '@taiga-ui/addon-table';
import { NgFor, NgIf } from '@angular/common';
import { ApiService } from '../../services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import {TuiPaginationModule, TuiPushService} from '@taiga-ui/kit';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sedes',
  standalone: true,
  imports: [ReactiveFormsModule, TuiHintModule, TuiSvgModule, TuiTagModule, NgIf, TuiModeModule, TuiInputModule, TuiButtonModule, TuiTableModule, NgFor, HttpClientModule, TuiPaginationModule, RouterLink],
  templateUrl: './sedes.component.html',
  styleUrl: './sedes.component.css'
})
export class SedesComponent implements OnInit{
  data: any = [];
  dataInitial: any=[];
  columns: any;
  sedeForm!: FormGroup;
  addNew: boolean=false;
  isEdit: boolean=false;
  dataEdit: any;
  
  constructor(
    private apiService: ApiService,
    private cd: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private alerts: TuiAlertService,
    private pushNoti: TuiPushService
  ) {}
  ngOnInit() {
    this.sedeForm = this.formBuilder.group({
      descControl: [null,Validators.required],
    });
    this.getSedes();
    if (this.data.length > 0) {
      this.columns = Object.keys(this.data[0]);
    }
  }
  index: any=0;
  length: any;
  minRow: any;
  maxRow: any;
  totRows: any;

  getSedes(){
    this.apiService.getSedes().subscribe(data=>{
      this.data = data;
      this.dataInitial = data;
      console.log(data);
      this.totRows=data.length;
      this.minRow=1;
      this.maxRow=6;
      //paginado
      this.data = this.dataInitial.slice(0,6);
      this.length=Math.ceil(this.dataInitial.length/6);
      if(this.length == 0) this.length = 1;
    }, error=>{
      console.log("error");
    });
  }
  goToPage(event:any){
    this.index = event;
    const maxNum = (event+1)*6;
    const minNum = event*6;
    this.data = this.dataInitial.slice(minNum,maxNum);
    this.minRow=minNum+1;
    maxNum > this.totRows ? this.maxRow = this.totRows : this.maxRow = maxNum;
    this.cd.detectChanges();
  }
  registrarSede(){
    const sede = {
      Descripcion: this.sedeForm.value.descControl,
    }
    console.log(sede);
    this.apiService.postSedes(sede).subscribe(data=>{
      this.addNew = false;
      this.alerts.open("Registro exitóso", { icon: 'tuiIconCheckCircle', status: 'success' }).subscribe({
        complete: () => {
          console.log('Notification is closed');
        },
      });
      this.getSedes();
      this.limpiar();
    }, (error)=>{
      this.alerts.open(error.response, { icon: 'tuiIconCheckCircle', status: 'error' }).subscribe({
        complete: () => {
          console.log('Notification is closed');
        },
      });
    })
  }

  updateSede(){
    const sede = {
      Descripcion: this.sedeForm.value.descControl,
    }
    this.apiService.putSedes(this.dataEdit.SedeID, sede).subscribe(data=>{
      this.isEdit = false;
      this.alerts.open("Edición exitóso", { icon: 'tuiIconCheckCircle', status: 'success' }).subscribe({
        complete: () => {
          console.log('Notification is closed');
        },
      });
      this.getSedes();
      this.limpiar();
    }, (error)=>{
      this.alerts.open(error.response, { icon: 'tuiIconCheckCircle', status: 'error' }).subscribe({
        complete: () => {
          console.log('Notification is closed');
        },
      });
    })
  }
  assignUpdate(data: any){
    this.isEdit = true;
    this.dataEdit = data;
    this.sedeForm.get("descControl")?.setValue(data.Descripcion);
  }
  deleteSede(id: number){
    this.apiService.deleteSedes(id).subscribe(data=>{
      this.alerts.open("Registro eliminado correctamente", { icon: 'tuiIconCheckCircle', status: 'success' }).subscribe({
        complete: () => {
          //console.log('Notification is closed');
        },
      });
      this.getSedes();
    }, (error)=>{
      this.alerts.open(error.response, { icon: 'tuiIconCheckCircle', status: 'error' }).subscribe({
        complete: () => {
          //console.log('Notification is closed');
        },
      });
    })
  }
  limpiar(){
    this.sedeForm.get("descControl")?.setValue('');
  }
}
