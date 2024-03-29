import { Component } from '@angular/core';
import { NotificationHost } from 'src/app/notification/model/notification-host';
import { NotificationForHostService } from 'src/app/notification/services/notification-for-host.service';
import { SharedService } from 'src/app/services/shared.service';
import {Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/env/env';
import { AuthService } from 'src/app/infrastructure/auth/services/auth.service';

@Component({
  selector: 'app-host-nav-bar',
  templateUrl: './host-nav-bar.component.html',
  styleUrls: ['./host-nav-bar.component.css']
})
export class HostNavBarComponent {
  numberOfNotifications: number = 0;
  haveNotifications: boolean = false;
  private serverUrl = environment.socket + 'socket'
  private stompClient: any;

  isLoaded: boolean = false;
  isCustomSocketOpened = false;

  constructor(private service: NotificationForHostService,private sharedService: SharedService,
    private authService:AuthService) {
    this.sharedService.numberOfNotifications$.subscribe(data => {
      this.numberOfNotifications = data;
      if(this.numberOfNotifications == 0){
        this.haveNotifications = false;
      }
    });
  }
 
  ngOnInit():void {
    this.initializeWebSocketConnection();
    this.getData();
  }
  getData():void{
    this.service.getNotificationsHost().subscribe({
      next:(notifications: NotificationHost[]) => {
        this.numberOfNotifications = 0;

        notifications.forEach((notification: NotificationHost) => {
          if (!notification.read) {
            this.numberOfNotifications += 1;
          }
        });
        if(this.numberOfNotifications != 0){
          this.haveNotifications = true;
        }
      }
    })
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    
    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openSocket();
    });
  }
  openSocket() {
    if (this.isLoaded) {
      this.isCustomSocketOpened = true;
      this.stompClient.subscribe("/socket-publisher/" + this.authService.getId(), (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }
  handleResult(message: { body: string; }) {
    if (message.body) {
      if(this.numberOfNotifications==0){
        this.haveNotifications = true;
      }
      this.numberOfNotifications += 1;
    }
  }

}
