import 'rxjs/add/operator/switchMap';
import {Component,Input,OnInit} from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import {Location} from '@angular/common';
import {Hero} from './hero';
import {HeroService} from './hero.service';


@Component({
    moduleId:module.id,
    selector:'my-hero-detail',
    templateUrl:'./my-hero-detail.html',
    styleUrls:['./hero-detail-component.css']
})

export class HeroDetailComponent implements OnInit{
    hero:Hero;
    ngOnInit(): void {

    this.route.params
      .switchMap((params: Params) => this.heroservice.getHero(+params['id']))
      .subscribe(hero => this.hero = hero);
  }
    constructor(
        private heroservice:HeroService,
        private route:ActivatedRoute,
        private location:Location){

    }
    goBack():void{
        this.location.back();
    }
    save():void{
        this.heroservice.update(this.hero).then(()=>this.goBack());
  
    }
   
    

}