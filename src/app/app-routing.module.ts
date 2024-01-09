import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { AccommodationDetailsImagesComponent } from './accommodation/accommodation-details-images/accommodation-details-images.component';
import { UpdateProfileComponent } from './user/update-profile/update-profile.component';
import {AccommodationCreateComponent} from "./accommodation/accommodation-create/accommodation-create.component";
import { LogInComponent } from './infrastructure/auth/log-in/log-in.component';
import { RegisterComponent } from './infrastructure/auth/register/register.component';
import { AuthGuard } from './infrastructure/auth/guard/auth.guard';
import { AccommodationApprovingComponent } from './accommodation/accommodation-approving/accommodation-approving.component';
import { UpdateAdminComponent } from './user/update-admin/update-admin.component';
import { AccommodationsFilterComponent } from './accommodation/accommodations-filter/accommodations-filter.component';
import { AccommodationDetailsComponent } from './accommodation/accommodation-details/accommodation-details.component';
import { combineLatest } from 'rxjs';
import { AccommodationsForHostComponent } from './accommodation/accommodations-for-host/accommodations-for-host.component';
import { UnauthorizedGuard } from './infrastructure/auth/guard/unauthorized.guard';
import {AccommodationUpdateComponent} from "./accommodation/accommodation-update/accommodation-update.component";
import { GuestReservationsComponent } from './accommodation/guest-reservations/guest-reservations.component';
import { HostReservationsComponent } from './accommodation/host-reservations/host-reservations.component';
import { NotificationForHostComponent } from './notification/notification-for-host/notification-for-host.component';
import { NotificationForGuestComponent } from './notification/notification-for-guest/notification-for-guest.component';
import { FavouritesComponent } from './accommodation/favourites/favourites.component';
import {CommentHostComponent} from "./comments/comment-host/comment-host.component";
import { AnalyticsComponent } from './analytics/analytics/analytics.component';
import { AllAccommodationsAnalyticsComponent } from './analytics/all-accommodations-analytics/all-accommodations-analytics.component';
import {CommentAccComponent} from "./comments/comment-acc/comment-acc.component";

const routes: Routes = [
  {path : "home", component : HomeComponent,},
  {path: "login", component: LogInComponent, canActivate: [UnauthorizedGuard]},
  {path: "register", component: RegisterComponent, canActivate: [UnauthorizedGuard]},
	{path: "accommodation-create", component: AccommodationCreateComponent, canActivate: [AuthGuard], data: {role: ['HOST']}},
  {path: "accommodation-details-images", component: AccommodationDetailsImagesComponent},
  {path: "update-profile", component: UpdateProfileComponent, canActivate: [AuthGuard], data: {role: ['GUEST', 'HOST']}},
  {path: "accommodation-approving", component: AccommodationApprovingComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']}},
  {path: "update-admin", component: UpdateAdminComponent, canActivate: [AuthGuard], data: {role: ['ADMIN']}},
  {path: "all-accommodations", component: AccommodationsFilterComponent},
  {path: "accommodation-details", component: AccommodationDetailsComponent},
  {path: "accommodations-for-host", component: AccommodationsForHostComponent, canActivate: [AuthGuard], data: {role: ['HOST']}},
	{path: "accommodation-update", component: AccommodationUpdateComponent, canActivate: [AuthGuard], data: {role: ['HOST']}},
	{path: "guest-reservations", component: GuestReservationsComponent, canActivate: [AuthGuard], data: {role: ['GUEST']}},
	{path: "host-reservations", component: HostReservationsComponent, canActivate: [AuthGuard], data: {role: ['HOST']}},
  {path: "notification-for-host",component:NotificationForHostComponent,canActivate: [AuthGuard], data: {role:['HOST']}},
  {path: "notification-for-guest",component:NotificationForGuestComponent,canActivate: [AuthGuard], data: {role:['GUEST']}},
	{path: "favourites", component: FavouritesComponent, canActivate: [AuthGuard], data: {role: ['GUEST']}},
	{path: "comment-host", component: CommentHostComponent, canActivate: [AuthGuard], data: {role: ['GUEST']}},
	{path: "analytics", component: AnalyticsComponent},
	{path: "analytics2", component: AllAccommodationsAnalyticsComponent},
	{path: "comment-acc", component: CommentAccComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
