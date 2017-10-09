import { Component, ViewChild } from '@angular/core';
import { NavParams, IonicPage, ViewController, Content, AlertController, Events } from 'ionic-angular';
import { ComplaintService } from '../../services/complaint.service';
import { CustomService } from '../../services/custom.service';
import { AuthService } from '../../services/auth.service';


@IonicPage()
@Component({
    selector: 'comments',
    templateUrl: './comments.html',
    styles: [``]
})

export class CommentsPage {

    title: string = "COMMENTS";
    inputChat: string = '';
    complaint: any;
    complaintIndex: number;
    comments: Array<any>;
    isCommentsEmpty: boolean;
    complaintClosed: boolean = false; // used only for handling comment count in case complaint is closed with a comment
    selfId: number = parseInt(localStorage.getItem('id'));
    postInProcess: boolean = false; //to show spinner while sending the message
    stompClient: any;
    isStudent: boolean;
    @ViewChild(Content) content: Content;

    constructor(
        private navParam: NavParams,
        private viewCtrl: ViewController,
        private alertCtrl: AlertController,
        private events: Events,
        private complaintService: ComplaintService,
        private customService: CustomService,
        private authService: AuthService
    ) {
        this.complaint = this.navParam.get('complaint');
        this.complaintIndex = this.navParam.get('complaintIndex');
        this.isStudent = localStorage.getItem('isStudent') === "true";
        this.getComments();
        this.sockJsConnection();
    }

    getComments() {

        this.customService.showLoader();
        this.complaintService.fetchComments(this.complaint.id)
            .subscribe((res: any) => {

                this.comments = res;
                this.isCommentsEmpty = this.comments.length == 0;
                this.customService.hideLoader();
                setTimeout(() => {
                    this.content.scrollToBottom();

                }, 500);

                this.checkComplaintStatus();
            }, (err: any) => {

                this.customService.showToast(err.msg);
                this.customService.hideLoader();
            });
    }

    checkComplaintStatus() {

        if (this.complaint.statusId == 4 || this.complaint.statusId == 6) {
            this.customService.showToast("You can't comment any more, your complaint is either closed or satisfied");
        }
    }

    sockJsConnection() {

        this.stompClient = this.authService.getSockJs();
        let loginType = this.isStudent ? 'st' : 'ma';
        let url1 = `/${loginType}/${this.complaintService.compOrSugg}/${this.complaint.id}/close`;
        let url2 = `/${loginType}/${this.complaintService.compOrSugg}/${this.complaint.id}/comment`;

        this.stompClient.connect({}, (frame) => {


            this.stompClient.subscribe(url1, (greeting) => {

                let message = JSON.parse(greeting.body);
                if (!message) {
                    return;
                }

                this.complaint = message;
                this.complaintClosed = true;
                this.showPrompt();
                this.content.scrollToBottom();

            });

            this.stompClient.subscribe(url2, (greeting) => {

                let message = JSON.parse(greeting.body);
                if (!message) {
                    return;
                }
            console.log(message);
                this.comments.push(message);
                this.content.scrollToBottom();
                this.isCommentsEmpty = this.comments.length == 0;
                if (!this.complaintClosed) { this.complaint.commentCount++; }


            });

        });

    }

    showPrompt() {

        let alert = this.alertCtrl.create({
            title: `Closed`,
            subTitle: `This ${this.complaintService.compOrSugg} has been closed, you can't comment anymore`,
            buttons: ['Dismiss']
        });
        alert.present();

    }


    postChat() {

        this.postInProcess = true;
        this.content.scrollToBottom();
        this.complaintService.postComments(this.complaint.id, this.inputChat)
            .subscribe((res: any) => {

                this.postInProcess = false;
                this.inputChat = '';
                this.complaint.commentCount++;
                this.isCommentsEmpty = false;
                this.showRecentPost(res);
                this.content.scrollToBottom();
            }, (err: any) => {

                this.customService.showToast(err.msg);
                this.inputChat = '';
                this.postInProcess = false;

            });
    }

    showRecentPost(commentData: any) {
        this.comments.push({
            comment: commentData.comment,
            employeeId: commentData.employeeId || null,
            employeeName: commentData.employeeName || null,
            employeeNickName: commentData.employeeNickName || null,
            studentId: commentData.studentId || null,
            studentName: commentData.studentName || null,
            studentPic: commentData.studentPic || null,
            createdAt: new Date(Date.now())
        });

    }


    dismiss() {

        this.disconnectSockJs();
        this.events.publish('complaintStatusChangedInCommentsPage', this.complaint, this.complaintIndex);
        this.customService.hideToast();
        this.viewCtrl.dismiss();
    }

    disconnectSockJs() {

        /**disconnect the connection if connected  */
        if (this.stompClient && this.stompClient.connected) {

            this.stompClient.disconnect((res: any) => {
                console.log(res);
            });
        }
    }
}