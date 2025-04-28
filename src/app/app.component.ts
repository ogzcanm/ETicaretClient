import { Component , OnInit, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { MessageType } from './services/admin/alertify.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { HttpClientService } from './services/common/http-client.service';
import { ComponentType, DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  @ViewChild(DynamicLoadComponentDirective,{static : true})
  dynamicLoadComponentDirective : DynamicLoadComponentDirective;

  constructor(
    public authService : AuthService,
    private toastrService : CustomToastrService,
    private router : Router,
    private httpClientService : HttpClientService,
    private dynamicLoadComponentService : DynamicLoadComponentService
  ){
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

  loadComponent(){
    this.dynamicLoadComponentService.loadComponent(ComponentType.BasketComponent,
      this.dynamicLoadComponentDirective.viewContaierRef)
  }
}

