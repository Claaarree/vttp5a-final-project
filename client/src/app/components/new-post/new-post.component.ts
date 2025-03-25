import { Component, inject, model, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import { Image, Place, Post } from '../../models/models';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-post',
  standalone: false,
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit{

  
  private fb = inject(FormBuilder);
  private fileUploadSvc = inject(FileUploadService);
  private router = inject(Router);
  private postService = inject(PostService);
  form!: FormGroup;
  images: Image[] = [];
  post!: Post;
  filelist!: FileList;
  fileError!: string;
  placeError!: string;
  areas: string[] = ["Central", "East", "West", "North", "NorthEast"];
  selectedArea!: string;
  selectedPlace! : Place;
  isSubmitted = false;

  async ngOnInit(): Promise<void> {
    this.form = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      rating: this.fb.control<number>(0, [Validators.min(0), Validators.max(5)]),
      review: this.fb.control<string>('', Validators.required),
      area: this.fb.control<string>('', Validators.required)
    })
  }

  selectFiles() {
    this.fileError='';
    document.getElementById('fileInput')?.click()
  }

  onFileChange(event: Event) {
    console.log("onFileChange");
    const input = event.target as HTMLInputElement;

    if(input.files && input.files.length < 4) {
      this.filelist = input.files;
      // Iterate over the files using forEach
      Array.from(input.files).forEach((file, idx) => {
        // 
        // console.log(`file ${idx}: ` + file);
        // 
        const reader = new FileReader();
        reader.onload = () => {
          // set the image source to result?? yes
          const result = reader.result as string;
          this.images.push({src: result});
        };
        reader.readAsDataURL(file);
      });
    } else {
      this.fileError = "Please do not upload more than 3 pictures!"
    }
  }

  postInvalid(): boolean {
    if(this.form.valid && this.images.length > 0 && this.selectedPlace) {
      return false;
    }
    return true;
  }

  upload() {
    // removing area from form and adding to place
    console.log("area: ", this.form.value.area)
    console.log("selected: ", this.selectedPlace)
    this.selectedPlace.area = this.form.value.area;
    this.form.removeControl("area");
    // adding placeId to form
    this.form.value.placeId = this.selectedPlace.placeId;
    const formValue = this.form.value;
    // 
    console.log(formValue);
    console.log(this.selectedPlace);
    // 

    this.post = formValue;
    // 
    console.log(this.filelist);
    // 
    this.fileUploadSvc.upload(this.post, this.selectedPlace, this.filelist)
      .then((result) => {
        console.log(result);
        this.isSubmitted = true;
        this.router.navigate(['/viewpost', result.postId])
      }).catch(err => {
        console.log(err)
      })
  }

  protected getPlaceDetails(place: Place) {
    console.log("in new post: ", place);
    this.selectedPlace = place;
  }

  removeImage(i : number) {
    const newlist = Array.from(this.filelist);
    const dt = new DataTransfer();
    newlist.forEach((file: File, idx: number) => {
      if(idx !== i){
        dt.items.add(file);
      }
    });
    this.filelist = dt.files;
    this.images.splice(i, 1);
  }
}
