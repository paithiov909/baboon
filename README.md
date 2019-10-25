# Baboon

a clone of Inuzaru tanka generator

## Usage

In the browser:

```{html}
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js"></script>
<script src="baboon/dist/baboon.js"></script>
<script>
  axios.get("https://gson.fayazara.now.sh?url=https://docs.google.com/spreadsheets/d/e/2PACX-1vQn9FFMyLY_7tKVg_4gEU9wAWcwtXK6eT8Vf8Ob97jbzm2vAsERThvspBTdgihytUdRkPO1HvDxWBCo/pub?output=csv")
    .then(res => {
      const baboon = new Baboon(res.data)
      console.log(baboon.create())
    })
</script>

```

As an ES6 module:

```{js}
import axios from "axios"
import Baboon from "baboon"

const phrases = axios.get("https://gson.fayazara.now.sh?url=https://docs.google.com/spreadsheets/d/e/2PACX-1vQn9FFMyLY_7tKVg_4gEU9wAWcwtXK6eT8Vf8Ob97jbzm2vAsERThvspBTdgihytUdRkPO1HvDxWBCo/pub?output=csv")
    .then(res => {
        return res.data
    })
    .catch(error => {
        console.error(error.response)
        return []
    })
const baboon = new Baboon(phrases)
console.log(baboon.create())
```

## License

Copyright (c) 2019 Kato Akiru

Released under the MIT license
https://github.com/paithiov909/baboon/blob/master/LICENSE
