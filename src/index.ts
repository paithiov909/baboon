import dic from "./dict.js";
import rep from "./recipe.js";
import _ from "underscore";
import { include } from "underscore.string";

export type Typetag = {
  m: string;
  s: string;
  j: string;
};
export type Vocab = {
  stamp: string;
  word: string;
  type: string;
  mora: number;
};
export type Dict = Array<Vocab>;
export type Recipe = string[];

export default class Baboon {
  private typetag: Typetag;
  private dict: Dict;
  private recipe: Recipe;

  public constructor(dict?: Dict, recipe?: Recipe, typetag?: Typetag) {
    this.typetag =
      typeof typetag == "undefined"
        ? { m: "名詞", s: "修飾部", j: "述部" }
        : typetag;
    this.dict = typeof dict == "undefined" ? dic : dict;
    this.recipe = typeof recipe == "undefined" ? rep : recipe;
  }

  private pickWord({ mora, type }): Array<string> {
    return _.chain(this.dict)
      .filter((el) => {
        return el.mora == Number(mora);
      })
      .filter((el) => {
        return el.type == type;
      })
      .sample(1)
      .pluck("word")
      .value();
  }
  private parseRecipe(str: string): Array<T> {
    const recipe = str.split("+");
    return _.chain(recipe)
      .map((el) => {
        if (el.match(/^[msj]+\d/)) {
          let type = this.typetag["m"];
          if (include(el, "s")) {
            type = this.typetag["s"];
          }
          if (include(el, "j")) {
            type = this.typetag["j"];
          }
          return {
            type: type,
            mora: _.last(el.split("")),
          };
        } else {
          return el;
        }
      })
      .value();
  }

  create(): string {
    const recipe = _.sample(this.recipe);
    return _.chain(this.parseRecipe(recipe))
      .map((el) => {
        if (_.isObject(el)) {
          return this.pickWord(el);
        } else {
          return el;
        }
      })
      .reduce((prev, el) => {
        return `${prev}${el}`;
      }, "")
      .value();
  }
}
