import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../Models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'https://localhost:7124/api/Notifications';

  constructor(private http: HttpClient) {}

  getNotifications(receiverId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/${receiverId}`);
  }

  sendNotification(notification: { senderId: number; receiverId: number; contents: string }): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/send`, notification);
  }


  markAsRead(notification: Partial<Notification>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${notification.id}/mark-as-read`, {});
  }

}
