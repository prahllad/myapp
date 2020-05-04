import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

 
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent implements OnInit {
 
  selectedFiles: FileList;
  imageObj;
   imageUrl: String;
  private ngUnsubscribe: Subject<any> = new Subject();


 
  constructor(private imageUploadService: UserService) { }
 
  ngOnInit() {
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
 
  onImagePicked(event): void {
    this.imageObj =  event.target.files[0];
  }

   onImageUpload() {
    const formData: FormData = new FormData();
    formData.append('image', this.imageObj, this.imageObj.name);
    this.imageUploadService.imageUpload(formData).pipe(takeUntil(this.ngUnsubscribe)).subscribe((success) => {
      this.imageUrl = success;
    }, (error) => {
      console.error('error: ', error);
    });
   }
}