
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { IonicPage, ActionSheetController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: 'sort-filter',
    template: `
   <ion-footer>         
    <ion-grid no-padding>
        <ion-row>
            <ion-col no-padding>
                <button full ion-button (click)="onSort()" [style.background-color]="sortSelected ? 'grey': ''" icon-start>
                    <ion-icon name="arrow-round-down"></ion-icon><ion-icon name="arrow-round-up"></ion-icon>
                Sort By
                </button>
            </ion-col>

            <ion-col no-padding>
                    <button full ion-button (click)="onFilter()" [style.background-color]="filterSelected ? 'grey': ''" icon-start>
                        <ion-icon name="funnel"></ion-icon>
                    Filter By
                    </button>
            </ion-col>  
        </ion-row>
    </ion-grid>
    <ion-footer>
            `,
    styles: [`
        button{
            margin: 0rem 0rem !important;
        }
    `]


})

export class SortFilterOptionsPage implements OnInit {

    statusOptions: any;
    priorityOptions: any;
    complaintCategoryOptions: any;
    @Input() sortSelected: boolean;
    @Input() filterSelected: boolean;
    @Output() onSelect = new EventEmitter<any>();


    constructor(
        private actionSheetCtrl: ActionSheetController,
    ) { }

    ngOnInit() {
        
        this.statusOptions = JSON.parse(localStorage.getItem('complaintStatusList'));
        this.priorityOptions = JSON.parse(localStorage.getItem('complaintPriorityList'));
        this.complaintCategoryOptions = JSON.parse(localStorage.getItem('complaintCategoryOptions'));
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
                    text: 'Category',
                    handler: () => {
                        //show further options of complaintCatgories
                        this.onSelect.emit({ sortName: 'category', filter: null });

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
                    text: 'Category',
                    handler: () => {
                        this.filterBySubCategories(3);

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
        } else if (id == 2) {

            actionSheet.setTitle('Select Status');

            for (let i = 0; i < this.statusOptions.length; i++) {
                actionSheet.addButton({
                    text: this.statusOptions[i].name,
                    handler: () => {
                        this.onSelect.emit({ sortName: null, filter: { filterName: 'status', id: this.statusOptions[i].id } });
                    }
                });
            }
        } else {

            actionSheet.setTitle('Select Category');

            for (let i = 0; i < this.complaintCategoryOptions.length; i++) {
                actionSheet.addButton({
                    text: this.complaintCategoryOptions[i].name,
                    handler: () => {

                        this.afterCategorySelect(this.complaintCategoryOptions[i]);
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

    afterCategorySelect(selectedCategory: any) {
        console.log(selectedCategory);

        const actionSheet = this.actionSheetCtrl.create();

        actionSheet.setTitle('Select Subcategory');

        for (let i = 0; i < selectedCategory.subCategory.length; i++) {
            actionSheet.addButton({
                text: selectedCategory.subCategory[i].name,
                handler: () => {

                    if (selectedCategory.subCategory[i].id !=3 && selectedCategory.subCategory[i].subCategory && selectedCategory.subCategory[i].subCategory.length != 0) {

                        this.afterSubcategorySelect(selectedCategory.subCategory[i]);
                    } else {

                        this.onSelect.emit({ sortName: null, filter: { filterName: 'category', id: selectedCategory.subCategory[i].id } });
                    }
                }
            });
        }

        actionSheet.present();

    }

    afterSubcategorySelect(selectedSubcategory: any) {

        const actionSheet = this.actionSheetCtrl.create();
        switch (selectedSubcategory.id) {
            // further options if needed in future can be added here
            case 6: actionSheet.setTitle('Select Student Activities');
                break;
        }

        for (let i = 0; i < selectedSubcategory.subCategory.length; i++) {
            actionSheet.addButton({
                text: selectedSubcategory.subCategory[i].name || selectedSubcategory.subCategory[i].facultyName,
                handler: () => {
                    this.onSelect.emit({ sortName: null, filter: { filterName: 'category', id: selectedSubcategory.subCategory[i].id || selectedSubcategory.subCategory[i].facultyId } });
                }
            });
        }

        actionSheet.present();
    }
}