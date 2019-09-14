import { AfterViewChecked, ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { ChatService } from '../app.chat.service';


@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit, AfterViewChecked  {
  @ViewChild('scrollToBottom') private myScrollContainer: ElementRef;

  ngAfterViewChecked(): void {
    this.scrollToBottom();  
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}
  message: string;
  messages: string[] = [];
  constructor(private chatService: ChatService) {
  }

  onKeydown(event: any) {
    if (this.message !== undefined && this.message != 'undefined') {
      this.sendMessage();
    }
    else{
      this.message = '';
      return false;
    }
  }
  
  sendMessage() {
    if(this.message === undefined || this.message === 'undefined') {
      this.message = '';
      return;
    };
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

  ngOnInit() {
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });
  }
}
