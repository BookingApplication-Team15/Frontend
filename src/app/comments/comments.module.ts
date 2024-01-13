import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentHostComponent } from './comment-host/comment-host.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import { CommentAccComponent } from './comment-acc/comment-acc.component';
import { ApproveCommentsComponent } from './approve-comments/approve-comments.component';

@NgModule({
  declarations: [
    CommentHostComponent,
    CommentAccComponent,
    ApproveCommentsComponent
  ],
	imports: [
		CommonModule,
		MaterialModule,
	],
	exports: [
		CommentHostComponent,
	]
})
export class CommentsModule { }
