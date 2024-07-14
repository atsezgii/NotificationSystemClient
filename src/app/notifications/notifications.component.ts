import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../Shared/Services/notification.service';
import { Notification } from '../Shared/Models/notification';
import { AuthService } from '../Shared/Services/auth.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit{

  notifications: Notification[] = [];
  userId : number;

  constructor(private notificationService: NotificationService,private authService:AuthService) {}

  ngOnInit(): void {
    console.log("fdavsfxc")
    this.userId= Number(this.authService.getCurrentUserId());
    this.loadNotifications();
  }

  loadNotifications(): void {
    console.log("fdavsfxc")
    this.notificationService.getNotifications(this.userId).subscribe(
      data => {
        console.log("data",data)
        this.notifications = data;
      },
      error => {
        console.error('Error fetching notifications', error);
      }
    );
  }
  markAsRead(notification: Notification): void {
    console.log("notf id", notification.id)
    this.notificationService.markAsRead(notification).subscribe(
      () => {
        notification.readStatus = true;
      },
      error => {
        console.error('Error marking notification as read', error);
      }
    );
  }
  sendNotification(receiverId: string, contents: string): void {
    const newNotification = {
      senderId: this.userId, // Sender is the current logged-in user.
      receiverId: +receiverId, // Convert receiverId to a number.
      contents: contents,
      postedDate: new Date()
    };

    this.notificationService.sendNotification(newNotification).subscribe(
      () => {
        this.loadNotifications(); // Reload notifications to include the new one.
      },
      error => {
        console.error('Error sending notification', error);
      }
    );
  }
}
