import { Component } from '@angular/core';
import { AccommodationService } from '../services/accommodation.service';
import { AccommodationPopular } from '../model/accommodation.model';
import { environment } from 'src/env/env';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accommodations-for-host',
  templateUrl: './accommodations-for-host.component.html',
  styleUrls: ['./accommodations-for-host.component.css']
})
export class AccommodationsForHostComponent {

  constructor(private route: ActivatedRoute, private accommodationService: AccommodationService){}

  infoMessage:string = '';

  ngOnInit(){
    this.getAccommodations();
    this.route.queryParams
    .subscribe(params => {
      if(params['newAccommodation'] !== undefined && params['newAccommodation'] !== "") {
          this.infoMessage = 'Successfully added: ' + params['newAccommodation'] + ' property ';
      }else if(params['updateAccommodation'] !== undefined && params['updateAccommodation'] !== ""){
          this.infoMessage = 'Successfully updated: ' + params['updateAccomodation'] + ' property ';
      }
    });
  }
  hostAccommodations: AccommodationPopular[] = [];
  imageBase64:string = environment.imageBase64;

  getAccommodations() {
    this.accommodationService.getAccommodationsForHost().subscribe({
      next:(accommodations: AccommodationPopular[])=>{
        this.hostAccommodations = accommodations;
      }
    })
  }
}
