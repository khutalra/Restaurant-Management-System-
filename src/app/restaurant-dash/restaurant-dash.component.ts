import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RestaurantData } from './restaurant.modal';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.scss']
})
export class RestaurantDashComponent implements OnInit {
  allRestaurantData: any;
  showAdd !: boolean ;
  showbtn!: boolean ;

  constructor(private formbuilder: FormBuilder, private service: ApiService) { }

  formvalue !: FormGroup;
  RestaurantObjectModel: RestaurantData = new RestaurantData;
  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      name: [""],
      address: [""],
      email: [""],
      number: [""],
      services: [""],
    });
    this.getAllData();
  }

clickAddResto(){
  this.formvalue.reset();
  this.showAdd = true ;
  this.showbtn = false ;
}

  addResto() {
    this.RestaurantObjectModel.name = this.formvalue.value.name;
    this.RestaurantObjectModel.address = this.formvalue.value.address;
    this.RestaurantObjectModel.email = this.formvalue.value.email;
    this.RestaurantObjectModel.number = this.formvalue.value.number;
    this.RestaurantObjectModel.services = this.formvalue.value.services;

    this.service.PostRestaurant(this.RestaurantObjectModel).subscribe((res: any) => {
      console.log(res);
      alert("data addeded successfully");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formvalue.reset();
      this.getAllData();
     

    },
      (err) => {
        console.log("something wrong.");
      }
    );
  }

  getAllData(){
    this.service.GetRestaurant().subscribe((res)=>{
      this.allRestaurantData = res ;
    })
  }

  deleteData(data:any){
    this.service.DeleteRestaurant(data.id).subscribe((res)=>{
        alert("data is deleted .");
        this.getAllData();
    })
  }

  editRestoData(data:any){
    this.showAdd = false ;
  this.showbtn = true ;
    this.RestaurantObjectModel.id = data.id ;
    this.formvalue.controls['name'].setValue(data.name);
    this.formvalue.controls['address'].setValue(data.address);
    this.formvalue.controls['email'].setValue(data.email);
    this.formvalue.controls['number'].setValue(data.number);
    this.formvalue.controls['services'].setValue(data.services);
  }

  UpdateResto(){
    this.RestaurantObjectModel.name = this.formvalue.value.name;
    this.RestaurantObjectModel.address = this.formvalue.value.address;
    this.RestaurantObjectModel.email = this.formvalue.value.email;
    this.RestaurantObjectModel.number = this.formvalue.value.number;
    this.RestaurantObjectModel.services = this.formvalue.value.services;

    this.service.UpdateRestaurant(this.RestaurantObjectModel , this.RestaurantObjectModel.id).subscribe((res)=>{
      alert("record updated successfully ");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formvalue.reset();
      this.getAllData();

    });
  }
}
