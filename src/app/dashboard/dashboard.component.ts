import {Component,OnInit} from '@angular/core'
import {Hero} from './../hero/hero';
import {HeroService} from './../hero/hero.service';
@Component({
    selector:'my-dashboard',
    templateUrl:'./dashboard.component.html',
    styleUrls:['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
    heros:Hero[] = [];
    constructor(private heroservice:HeroService){

    }
    ngOnInit():void{
        this.heroservice.getHeros().then(
                heros=>this.heros =heros.slice(0,3)
        );

    }

}