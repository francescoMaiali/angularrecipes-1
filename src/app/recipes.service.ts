import { Injectable, EventEmitter } from "@angular/core";
import { Recipe } from './recipes/recipe-list/recipe.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipesService {

  URL = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

  recipes: Recipe[] = [  ];

 // recipeChanged = new EventEmitter<Recipe>();
  selectedRecipe: Recipe = null;

  public changeSelectedRecipe(ricetta: Recipe) {
    console.log("changeSelectedRecipe", ricetta);
    this.selectedRecipe = ricetta;
   //this.recipeChanged.emit(this.selectedRecipe);
  }

 /* public getRecipe() {
    return this.selectedRecipe;
  }

*/


  constructor(private http: HttpClient) {  }



  searchRecipes (searchTerm: string = "cake") {

    const url_composta = this.URL + searchTerm;

    const response = this.http.get(url_composta)
    .toPromise()
    /*.then(function(recipes){
    })*/
    .then( (resp: {meals: [ ]} ) => {
      console.log("Ricette ricevute", resp);
      this.recipes = resp.meals;
    })
    .catch(err => {
      console.error("ERRORE!!!", err );
    });

  }

}
