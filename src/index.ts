import dic from "./dict.js";
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
    this.recipe =
      typeof recipe == "undefined"
        ? [
            "m4+の+m3+j4+s5+s4+m2+j6+m2",
            "s5+m3+の+m2+j6+m3+j4+s4+m3",
            "m4+j5+s3+m4+は+m6+の+m3+j4",
            "m4+j5+s3+m4+j4+s4+m4+j3",
            "m4+j4+m3+の+m4+j5+s3+m4+j3",
            "s5+m6+j6+s3+m3+j6+m2",
            "m4+j5+s3+m4+j8+s5+m2",
            "m4+j4+m3+j6+s7+s3+m4",
            "s5+m6+j6+s7+m2+j5",
            "s5+m2+j5+m4+は+s4+m2+j8",
            "s5+s7+m2+j3+m6+j8",
            "m2+j3+s3+m3+j6+m2+の+m3+j8",
            "m4+j6+m2+　+s5+m2+j5+s3+m4",
            "s5+m3+j4+s5+m3+の+m2+j5+m3",
            "m4+は+m6+の+m2+j3+s4+m2+j6+m2",
            "m4+j4+s4+m4+は+s7+m4+j3",
            "s5+s4+m2+の+m4+j5+s3+m3+j4",
            "s5+m4+j3+m4+j4+s4+m4+j3",
            "m4+j8+s5+m3+の+m2+j4+m4",
            "s5+m2+の+m3+j6+m6+は+s4+m3",
          ]
        : recipe;
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
