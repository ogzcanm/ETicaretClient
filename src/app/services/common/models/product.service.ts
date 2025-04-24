import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product} from '../../../contracts/create_product';
import { error } from 'node:console';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Product } from '../../../contracts/list_product';
import { firstValueFrom, Observable } from 'rxjs';
import { List_Product_Image } from '../../../contracts/list_product_image';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  changeShowcaseImage(imageId: string, arg1: string, arg2: () => void) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, succesCallBack?:()=> void,errorCallBack?:(errorMessage :string)=> void) {
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {
      succesCallBack();
    },(errorResponse:HttpErrorResponse)=>{
      const _error:Array<{key : string, value : Array<string>}> = errorResponse.error;
      let message ="";
      _error.forEach((v,index)=>{
        v.value.forEach((_v,index)=>{
          message += `${_v}<br>`
        });
      });
      errorCallBack(message);
    });
  }
  //-----------------------------------
  async read(page : number = 0,size: number =5, succesCallBack?:()=> void,errorCallBack?:(errorMessage:string)=> void) : Promise<{totalProductCount:number,products:List_Product[]}>{
    const promiseData : Promise<{totalProductCount:number,products:List_Product[]}>= this.httpClientService.get<{totalProductCount:number,products:List_Product[]}>({
      controller:"products",
      queryString: `page=${page}&size=${size}`
    }).toPromise();

    promiseData.then(d=> succesCallBack())
      .catch((errorResponse:HttpErrorResponse) => errorCallBack(errorResponse.message))

    return await promiseData;
  }
  //------------------------------------
  async delete(id:string){
    const deleteObservable : Observable<any> = this.httpClientService.delete<any>({
      controller:"products"
    },id);
    await firstValueFrom(deleteObservable);
  }

  async readImages(id : string, succesCallBack?: ()=> void) : Promise <List_Product_Image[]>{
    const getObservable : Observable<List_Product_Image[]> = this.httpClientService.get<List_Product_Image[]>({
      action: "getproductimages",
      controller : "products"
    },id);

    const images : List_Product_Image[] = await firstValueFrom(getObservable);
    succesCallBack();
    return images;
  }

  async deleteImage(id : string,imageId : string, succesCallBack?: ()=> void){
    const deleteObservable = this.httpClientService.delete({
      action : "deleteproductimage",
      controller : "products",
      queryString : `imageId=${imageId}`
    },id);
    await firstValueFrom(deleteObservable);
    succesCallBack();
  }

  async changeShowCaseImage(imageId : string , productId : string , succesCallBack?:()=>void):Promise<void>{
    const changeShowcaseImageObservable = this.httpClientService.get({
      controller : "products",
      action : "ChangeShowCaseImage",
      queryString : `imageId=${imageId}&productId=${productId}`
    });
    await firstValueFrom(changeShowcaseImageObservable);
    succesCallBack();
  }
}
