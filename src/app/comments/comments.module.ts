import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentHostComponent } from './comment-host/comment-host.component';
import {MaterialModule} from "../infrastructure/material/material.module";
import { CommentAccComponent } from './comment-acc/comment-acc.component';
import { ApproveCommentsComponent } from './approve-comments/approve-comments.component';
import { ReportCommentsComponent } from './report-comments/report-comments.component';
import { ReportCommentPopupComponent } from './report-comment-popup/report-comment-popup.component';

@NgModule({
  declarations: [
    CommentHostComponent,
    CommentAccComponent,
    ApproveCommentsComponent,
    ReportCommentsComponent,
    ReportCommentPopupComponent
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
