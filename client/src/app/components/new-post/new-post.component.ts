import { Component, inject, model, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../../services/file-upload.service';
import { Image, Post } from '../../models/models';

@Component({
  selector: 'app-new-post',
  standalone: false,
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit{

  
  private fb = inject(FormBuilder);
  private fileUploadSvc = inject(FileUploadService);
  form!: FormGroup;
  // dataUri = model([])
  images: Image[] = [];
  dataUri: string[] = [];
  post!: Post;
  filelist!: FileList;
  // try to get from component store...
  areas!: string[];

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
        console.log(`file ${idx}: ` + file);
        // 
        const reader = new FileReader();
        reader.onload = () => {
          // set the image source to result?? yes
          const result = reader.result as string;
          this.images.push({src: result});
          this.dataUri.push(result);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  upload() {
    console.log("dataUri: " + this.dataUri);
    if(!this.dataUri) {
      return;
    }
    const formValue = this.form.value;
    this.post = formValue;
    console.log(this.filelist);
    this.fileUploadSvc.upload(this.post, this.filelist)
      .then((result) => {
        console.log(result);
        // this.router.navigate(['/image', result.postId])
      })
  }

  // dataURItoBlob(dataURI: string): Blob{
  //   const [meta, base64Data] = dataURI.split(',');
  //   const mimeMatch = meta.match(/:(.*?);/);

  //   const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
  //   console.log(mimeMatch);
  //   const byteString = atob(base64Data);
  //   const ab = new ArrayBuffer(byteString.length);
  //   const ia = new Uint8Array(ab);
  //   for(let i = 0; i < byteString.length; i++){
  //     ia[i] = byteString.charCodeAt(i);
  //   }
  //   return new Blob([ia], {type: mimeType});
  // }
}
