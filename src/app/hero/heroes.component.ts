import { OnInit,Component } from '@angular/core';
import {Hero} from './hero';
import {HeroService} from './hero.service';
import {Router} from '@angular/router';
//import {herolist} from './hero/hero.list';

@Component({
  moduleId:module.id, 
  selector: 'my-heroes',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  providers:[HeroService]
})
export class HerosComponent implements OnInit {
  ngOnInit(): void {
    this.getHeroes();
  }

  constructor(private heroservice:HeroService,private router:Router){

  }
  getHeroes(): void {
    this.heroservice.getHeros().then(heros => this.heros = heros);
  }

  heros:Hero[];
 
  title = 'Tour of heros';
  selectedHero:Hero;
  onSelect(hero:Hero):void{
    this.selectedHero = hero;

  }
  gotoDetail(): void {
  this.router.navigate(['/detail', this.selectedHero.id]);
}
add(name:string):void{
  name = name.trim();
  if(!name){
    return;
  }else{
    this.heroservice.create(name).then(hero=>{
      this.heros.push(hero);
      this.selectedHero = null;
    })
    
  }

}
delete(hero:Hero):void{
  this.heroservice.delete(hero.id)
  .then(()=>{
    this.heros = this.heros.filter(h=>h!=hero)
    if(this.selectedHero === hero){
      this.selectedHero = null;
    }
  })

}

  
}
