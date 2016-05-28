import {Component} from "@angular/core";
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/homeComponent";

@Routes([
	{
		path: "/home",
		component: HomeComponent
	},
	{
		path: "*",
		component: HomeComponent
	},
	{
		path: "/*",
		component: HomeComponent
	}
])

@Component({
	selector: "app",
	templateUrl: "app/appComponent.html",
	styleUrls: ["app/appComponent.css"],
	providers: [ROUTER_PROVIDERS],
	directives: [ROUTER_DIRECTIVES]
})

export class AppComponent { 
	constructor() {
		console.log("im here");
	}
}
