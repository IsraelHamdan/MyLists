import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { listaDTO } from '../interfaces/listaDTO';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { NgFor } from '@angular/common';
import { Route, Router, RouterOutlet } from '@angular/router';
import { itemDTO } from '../interfaces/itemDTO';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-createlist',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './createlist.component.html',
  styleUrl: './createlist.component.sass',
})
export class CreatelistComponent {
  listForm: FormGroup;
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.listForm = this.fb.group({
      nome: ['', Validators.required],
      itens: this.fb.array([]),
    });
  }

  get itens(): FormArray {
    return this.listForm.get('itens') as FormArray;
  }

  addItem(): void {
    this.itens.push(this.createItem());
  }

  ngOnInit(): void {
    this.listForm = this.fb.group({
      nome: ['', Validators.required],
      itens: this.fb.array([this.createItem()]),
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.listForm.valid) {
      const list: listaDTO = this.listForm.value;
      console.log(list);
      this.api.postList(list).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
