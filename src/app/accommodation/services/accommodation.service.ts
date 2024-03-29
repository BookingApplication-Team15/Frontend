import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentModel } from '../model/comment.model';
import { Observable } from 'rxjs';
import {
	Accommodation, AccommodationCreate,
	AccommodationDetails,
	AccommodationPopular,
	AccommodationType,
	Amenities
} from '../model/accommodation.model';
import { environment } from 'src/env/env';
import { AuthService } from "src/app/infrastructure/auth/services/auth.service";
import { AccommodationCard } from "../model/card.model";
import { DatePipe } from '@angular/common';
import {Reservation} from "../model/reservation.model";
import {ReservationMethod} from "../model/reservation-method.model";
import {IntervalPrice} from "../model/interval-price.model";
import {CommentAboutAcc} from "../../comments/model/comment-about-acc-model";
import {CommentAboutHost} from "../../comments/model/comment-about-host.model";


@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private http: HttpClient,private datePipe: DatePipe,private authService: AuthService) { }

  getFavouritesAccommodations(id: number): Observable<AccommodationCard[]> {
    const url = environment.apiHost + `guests/${id}/favourites`;
    return this.http.get<AccommodationCard[]>(url);
  }

  getAccommodations(): Observable<AccommodationCard[]> {
    const url = environment.apiHost + 'accommodations/adminApproving';
    return this.http.get<AccommodationCard[]>(url);
  }

addFavourite(guestUserId: number, accommodationId: number): Observable<boolean> {
    const url = environment.apiHost + `guests/favourites/${guestUserId}/${accommodationId}`;
	  return this.http.post<boolean>(url, {});
  }

  removeFavourite(guestUserId: number, accommodationId: number): Observable<boolean> {
    const url = environment.apiHost + `guests/favourites/${guestUserId}/${accommodationId}`;
	  return this.http.delete<boolean>(url);
  }

  isFavourite(guestUserId: number, accommodationId: number): Observable<boolean> {
    const url = environment.apiHost + `guests/isFavourite/${guestUserId}/${accommodationId}`;
	  return this.http.get<boolean>(url);
  }

  setApprovalStatusAccommodation(id: number, approvalStatus: string): Observable<AccommodationDetails>{
    const url = environment.apiHost + 'accommodations/' + id + '/approvalStatus' ;
    return this.http.put<AccommodationDetails>(url, {"approvalStatus" : approvalStatus}, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
    });
  }

  getCommentsAboutAcc(id: number): Observable<CommentAboutAcc[]> {
    const url = environment.apiHost + `commentsAboutAcc/acc/${id}`;
    return this.http.get<CommentAboutAcc[]>(url);
  }


  getAccommodationInfo(id: number): Observable<AccommodationDetails> {
    const url = environment.apiHost + `accommodations/${id}`;
    return this.http.get<AccommodationDetails>(url);
  }


  getAllAccommodationsCards(): Observable<AccommodationPopular[]>{
    const url = environment.apiHost + `accommodations/popular`;
    return this.http.get<AccommodationPopular[]>(url);
  }
  getMinMaxPrice(): Observable<Number[]> {
    const url = environment.apiHost + `accommodations/minMaxPrice`;
    return this.http.get<Number[]>(url);
  }

  getAccommodationsForHost(): Observable<AccommodationPopular[]>{
    const url = environment.apiHost + `accommodations/host/${this.authService.getId()}`;
    return this.http.get<AccommodationPopular[]>(url);
  }


  filterAccommodations(
    city?: string | null,
    numberOfGuests?: number | null,
    startDate?: Date | null,
    endDate?: Date | null,
    startPrice?: Number | null,
    endPrice?: Number | null,
    amenities?: Amenities[],
    accommodationType?: AccommodationType | null
  ): Observable<AccommodationPopular[]> {
    const url = environment.apiHost + `accommodations/cards/filter`;
    let params = new HttpParams()
      .set('city', city || '')
      .set('numberOfGuests',  numberOfGuests?.toString() || '')
      .set('startPrice', startPrice?.toString() || '')
      .set('endPrice', endPrice?.toString() || '')
      .set('amenities', amenities ? amenities.join(',') : '')
      .set('accommodationType', accommodationType || '');

    if (startDate) {
      params = params.set('startDate', this.datePipe.transform(startDate, 'yyyy-MM-dd') || '');
    }

    if (endDate) {
      params = params.set('endDate', this.datePipe.transform(endDate, 'yyyy-MM-dd') || '');
    }

    return this.http.get<AccommodationPopular[]>(url, { params });
  }

  addAccommodation(accommodation: Accommodation): Observable<Accommodation>{
	  const url = environment.apiHost + 'accommodations';
	  return this.http.post<Accommodation>(url, accommodation, {
		  headers: new HttpHeaders({
			  'Content-Type': 'application/json'
		  })
	  });
  }

	addAccommodationImages(files: File[], accommodationId: number | null | undefined): Observable<any> {
		const url = environment.apiHost + `images/${accommodationId}`;

		const formData: FormData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('image', files[i]);
		}

		return this.http.post<any>(url, formData);
	}

	addIntervalPrice(accommodationId: number | null | undefined, intervals: IntervalPrice[]): Observable<number> {
		const url = environment.apiHost + `accommodations/priceList/${accommodationId}`;
		return this.http.post<number>(url, intervals, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		});
	}

	getAccommodation(id: number): Observable<Accommodation>{
		const url = environment.apiHost + `accommodations/${id}`;
		return this.http.get<Accommodation>(url);
	}

	getImages(id: number): Observable<string []>{
		const url = environment.apiHost + `images/${id}`;
		return this.http.get<string []>(url);
	}

	updateAccommodation(accommodation: Accommodation, id:number): Observable<Accommodation>{
		const url = environment.apiHost + `accommodations/${id}`;
		return this.http.put<Accommodation>(url, accommodation, {
			headers: new HttpHeaders({
				'Content-Type': 'application/json'
			})
		});
	}

	getIntervals(id: number): Observable<IntervalPrice[]>{
		const url = environment.apiHost + `accommodations/intervalPrices/${id}`;
		return this.http.get<IntervalPrice[]>(url);
	}

	getCommentsAboutHost(hostUserId: number): Observable<CommentAboutHost[]> {
		const url = environment.apiHost + `commentsAboutHost/host/${hostUserId}`;
		return this.http.get<CommentAboutHost[]>(url);
	}

}

