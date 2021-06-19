import dic from "./dict.js";
import rep from "./recipe.js";

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
export type Dict = Vocab[];
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

  private sample(arr: Array<T>): unknown {
    const len = arr == null ? 0 : arr.length;
    return len ? arr[Math.floor(Math.random() * len)] : undefined;
  }
  private isString(str: unknown): boolean {
    if (str && typeof str.valueOf() === "string") {
      return true;
    }
    return false;
  }
  private pickWord({ type, mora }): string[] {
    const filtered = this.dict
      .filter((el) => {
        return el.mora == Number(mora);
      })
      .filter((el) => {
        return el.type == type;
      });
    return this.sample(filtered).word;
  }
  private parseRecipe(str: string): Array<T> {
    const recipe = str.split("+");
    return recipe.map((el) => {
      if (el.match(/^[msj]+\d/)) {
        let type = this.typetag["m"];
        if (el.includes("s")) {
          type = this.typetag["s"];
        }
        if (el.includes("j")) {
          type = this.typetag["j"];
        }
        return {
          type: type,
          mora: el.split("").slice(-1)[0],
        };
      } else {
        return el;
      }
    });
  }
  public create(): string {
    const recipe = this.sample(this.recipe);
    const parsed = this.parseRecipe(recipe);
    const result = parsed
      .map((el) => {
        if (this.isString(el)) {
          return el;
        } else {
          return this.pickWord(el);
        }
      })
      .reduce((prev, el) => {
        return `${prev}${el}`;
      }, "");
    return result;
  }
}
