import {Component} from "@angular/core";

@Component({
	selector: "app",
	templateUrl: "app/appComponent.html",
	styleUrls: ["app/appComponent.css"]
})

export class AppComponent { 
	constructor() {
		console.log("im here");
	}
}
