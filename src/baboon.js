import _  from "underscore"
import { include } from "underscore.string"

export default class Baboon {
    constructor (vocab, recipe = null, hashtag = ["名詞", "修飾部", "述部"]) {
        this.hashtag = {
            m: hashtag[0],
            s: hashtag[1],
            j: hashtag[2]
        }
        this.vocab = _.isArray(vocab) ? vocab : []
        if (_.isNull(recipe)) {
            this.recipe = [
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
                "s5+m2+の+m3+j6+m6+は+s4+m3"
            ]
        } else {
            this.recipe = _.isArray(recipe) ? recipe : []
        }
    }
    pickWord ({ type, mora }) {
        return _.chain(this.vocab)
            .filter(el => { return el.mora === mora })
            .filter(el => { return el.type === type })
            .sample(1)
            .pluck("word")
            .value()
    }
    parseRecipe (str) {
        const recipe = str.split("+")
        return _.chain(recipe)
            .map(el => {
                if (el.match(/^[msj]+\d/)) { // console.log(el)
                    let type = this.hashtag["m"]
                    if (include(el, "s")) { type = this.hashtag["s"] }
                    if (include(el, "j")) { type = this.hashtag["j"] }
                    return {
                        type: type,
                        mora: _.last(el.split(""))
                    }
                } else { // console.log(el)
                    return el
                }
            })
            .value()
    }
    create () {
        const recipe = _.sample(this.recipe)
        return _.chain(this.parseRecipe(recipe))
            .map(el => {
                if (_.isObject(el)) {
                    return this.pickWord(el)
                } else {
                    return el
                }
            })
            .reduce((prev, el) => { return `${prev}${el}` }, "")
            .value()
    }
}
