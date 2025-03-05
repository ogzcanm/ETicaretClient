import { Component , OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { MessageType } from './services/admin/alertify.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'ETicaretClient';
  constructor(private toastrService : CustomToastrService ){
    toastrService.message("Toastr","Mesaj",{
      messageType: ToastrMessageType.Info,
      position : ToastrPosition.BottomFullWidth
    })
  }
  ngOnInit(): void {
    $.get("https://localhost:7021/api/products",data=>{
      console.log(data)
    })
  }
}

