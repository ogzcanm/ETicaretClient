import { List_Product_Image } from "./list_product_image";

export class List_Product{
    id:string;
    name:string;
    stock:number;
    price:number;
    createdDate:Date;
    updatedDate:Date;
    productImagesFiles?: List_Product_Image[];
    imagePath : string;
}