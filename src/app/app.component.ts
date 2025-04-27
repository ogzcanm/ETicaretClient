import { Component , OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { MessageType } from './services/admin/alertify.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    public authService : AuthService,
    private toastrService : CustomToastrService,
    private router : Router,
    private httpClientService : HttpClientService
  ){

    // httpClientService.put({
    //   controller:"baskets"

    // },{
    //   basketItemId : "01966d50-65be-7d29-aae5-4ef53922a58e",
    //   Quantity: 100
    // }).subscribe(data =>{
    //   debugger;
    // });




    authService.identityCheck();
  }
  ngOnInit(): void {

  }

  signOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""])
    this.toastrService.message("Çıkış Yaptınız","Oturum Kapatıldı.",{
      messageType : ToastrMessageType.Warning,
      position : ToastrPosition.TopRight
    })
    this.toastrService.message("","Anasayfaya Yönlendiriliyorsunuz...",{
      messageType : ToastrMessageType.Success,
      position : ToastrPosition.TopRight
    })
  }
}

