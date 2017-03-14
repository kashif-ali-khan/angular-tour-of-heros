import {Injectable} from '@angular/core';
import {Headers,Http} from '@angular/http';
import {Hero} from './hero';
import {HEROS} from './hero.list';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService{
    private herosUrl = 'api/heroes';
    constructor(private http:Http){

    }
    getHeros():Promise<Hero[]>{
        return this.http.get(this.herosUrl)
        .toPromise()
        .then(response=>response.json().data as Hero[])
        .catch(this.handleError);
        //return Promise.resolve(HEROS);

    }
    private handleError(error:any):Promise<any>{
        console.error("An error occured",error);
        return Promise.reject(error.message||error);

    }
    getHerosSlowly():Promise<Hero[]>{
        return new Promise(resolve=>{
            setTimeout(()=>resolve(this.getHeros()),2000)
        })
        
    }
    // getHero(id:number):Promise<Hero>{
    //     return this.getHeros().then(heros=>heros.find(hero=>hero.id === id));

    // }

    getHero(id:number):Promise<Hero>{
        const url = `${this.herosUrl}/${id}`;
        return this.http.get(url)
        .toPromise()
        .then(response=>response.json().data as Hero)
        .catch(this.handleError);

    }
    private headers = new Headers({'content-type':'application/json'});
    update(hero:Hero):Promise<Hero>{
        const url = `${this.herosUrl}/${hero.id}`;
        return this.http.put(url,JSON.stringify(hero),{headers:this.headers})
        .toPromise()
        .then(()=>hero)
        .catch(this.handleError);

    }
    create(name:string):Promise<Hero>{
        return this.http
        .post(this.herosUrl,JSON.stringify({name:name}),{headers:this.headers})
        .toPromise()
        .then(res=>res.json().data)
        .catch(this.handleError);
        
        

    

    }
    delete(id:number):Promise<Hero>{
        const url =`${this.herosUrl}/${id}`;
        return this.http.delete(url,{headers:this.headers})
        .toPromise()
        .then(()=>null)
        .catch(this.handleError);
    }

}