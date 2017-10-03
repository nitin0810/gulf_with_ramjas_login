
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IonicPage, ActionSheetController, Events } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'sort-filter',
    template: `
            
    <ion-grid>
        <ion-row>
            <ion-col >
                <button ion-button (click)="onSort()" icon-start block outline>
                    <ion-icon name="arrow-round-down"></ion-icon><ion-icon name="arrow-round-up"></ion-icon>
                Sort By
                </button>
            </ion-col>

            <ion-col>
                    <button ion-button (click)="onFilter()" icon-start block outline>
                        <ion-icon name="funnel"></ion-icon>
                    Filter By
                    </button>
            </ion-col>  
        </ion-row>
    </ion-grid>
            `,
    styles: [``]


})

export class SortFilterOptionsPage implements OnInit {

    statusOptions: any;
    priorityOptions: any;

    @Output() onSelect = new EventEmitter<any>();


    constructor(
        private actionSheetCtrl: ActionSheetController,
        private events: Events
    ) { }

    ngOnInit() {
        this.statusOptions = JSON.parse(localStorage.getItem('complaintStatusList'));
        this.priorityOptions = JSON.parse(localStorage.getItem('complaintPriorityList'));

    }
    onSort() {
        const actionSheet = this.actionSheetCtrl.create({
            title: 'Sort By',
            buttons: [
                {
                    text: 'Title',
                    handler: () => {
                        /** this event is being listened in complaint.ts, 1st parameter is for sort, 2nd is for filter*/
                        this.onSelect.emit({ sortName: 'title', filter: null });
                    }
                },
                {
                    text: 'Faculty Name',
                    handler: () => {
                        this.onSelect.emit({ sortName: 'employee', filter: null });

                    }
                },
                {
                    text: 'Status',
                    handler: () => {
                        this.onSelect.emit({ sortName: 'status', filter: null });

                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });

        actionSheet.present();
    }

    onFilter() {
        const actionSheet = this.actionSheetCtrl.create({
            title: 'Filter By',
            buttons: [
                {
                    text: 'Priority',
                    handler: () => {
                        this.filterBySubCategories(1);

                    }
                },
                {
                    text: 'Status',
                    handler: () => {
                        this.filterBySubCategories(2);

                    }
                },

                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: () => {
                    }
                }
            ]
        });

        actionSheet.present();
    }

    /**id 1 is for priority and 2 is for status */
    filterBySubCategories(id: number) {
        const actionSheet = this.actionSheetCtrl.create();

        if (id == 1) {

            actionSheet.setTitle('Select Priority');

            for (let i = 0; i < this.priorityOptions.length; i++) {
                actionSheet.addButton({
                    text: this.priorityOptions[i].id,
                    handler: () => {
                        this.onSelect.emit({ sortName: null, filter: { filterName: 'priority', id: this.priorityOptions[i].id } });
                        
                    }
                });
            }
        }

        else {
            actionSheet.setTitle('Select Status');

            for (let i = 0; i < this.statusOptions.length; i++) {
                actionSheet.addButton({
                    text: this.statusOptions[i].name,
                    handler: () => {
                        this.onSelect.emit({ sortName: null, filter: { filterName: 'status', id: this.statusOptions[i].id } });
                    }
                });
            }
        }

        actionSheet.addButton({
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
            }
        });
        actionSheet.present();

    }
}