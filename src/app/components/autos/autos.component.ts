import { Component, OnInit } from '@angular/core';
import { AutosService } from '../../services/autos.service';
import {Auto} from '../../models/auto'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalDialogService } from "../../services/modal-dialog.service";

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
Titulo = "Autos";
  Items: Auto[] = [];
  EstadoForm: string;
  FormReg: FormGroup;

  submitted = false;

  constructor(private autosService: AutosService, private formBuilder: FormBuilder) { }
ngOnInit() {
        this.EstadoForm = 'L';
        this.submitted = false;
        this.getAuto();
        this.FormReg = this.formBuilder.group({
         IdAuto:[0],
         NombreAuto: ['',[Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
         PrecioAuto: ['',[Validators.required, Validators.pattern("[0-9]{1,15}")]],
    });
  }
  getAuto(){
     this.autosService.get()
    .subscribe((res:Auto[])=>{
      this.Items = res;

  });
  }
  Alta(){
    window.scroll(0, 0);
    this.EstadoForm = 'A';
    this.submitted = false;
  }

  Grabar() {
    this.submitted = true;
    // verificar que los validadores esten OK
     if (this.FormReg.invalid)
     {
      return;
      }
  
  
  
    //hacemos una copia de los datos del formulario, para modificar la fecha y luego enviarlo al servidor
    const itemCopy = { ...this.FormReg.value };

    // agregar post
    itemCopy.IdAuto= 0;
    this.autosService.post(itemCopy).subscribe((res: any) => {
        this.getAuto();
        this.Volver();

     });
    }
 
 Eliminar(IdAuto){
    this.autosService.delete(IdAuto).subscribe((res: string) =>{
      this.Volver();
      this.getAuto();
    });
  }



  Volver() {
    this.EstadoForm = "L";
    this.FormReg.reset();

  };



}

