const FreeDict = {
  file: '/data/fra-eng.dict.txt',
  words: [],
  index: {},
  cache: {},
  tables: [],
  loadWords() {
    return new Promise(resolve => {
      console.log('FreeDict: Loading words')
      let xhttp = new XMLHttpRequest()
      let that = this
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          that.words = that.parseDictionary(this.responseText)
          resolve()
        }
      }
      xhttp.open('GET', this.file, true)
      xhttp.setRequestHeader('Cache-Control', 'max-age=3600')
      xhttp.send()
    })
  },
  parseDictionary(text) {
    text = text.replace(/(.|\n)*French-English FreeDict Dictionary .*\n/m, '')
    let words = []
    console.log('Parsing "French-English FreeDict Dictionary"...')
    let lines = text.split('\n')
    for (let index in lines) {
      index = parseInt(index)
      let french = lines[index]
      let matches = french.match(/(.*) \/(.*)\//)
      if (matches) {
        let matches2 = french.match(/<(.*)>/)
        // Parse definitions (sometimes it's one line, other times it's multiple lines with numeric headings)
        let i = 1
        let isDef = !lines[index + i].match(/(.*) \/(.*)\//)
        let definitions = []
        while (isDef) {
          let def = lines[index + i].replace(/^\d+\./, '').trim()
          if (def !== '') {
            definitions.push(def)
          }
          i = i + 1
          if (lines[index + i]) {
            isDef = !lines[index + i].match(/(.*) \/(.*)\//)
          } else {
            isDef = false
          }
        }
        let word = {
          bare: matches ? matches[1] : undefined,
          head: matches
            ? matches[1].replace(/\(.*\)\/ /, '').toLowerCase()
            : undefined,
          pronunciation: matches ? matches[2] : undefined,
          definitions: definitions,
          pos: matches2 && matches2.length > 1 ? matches2[1] : undefined
        }
        word.accented = word.bare
        words.push(word)
      }
    }
    words = words.sort((a, b) => {
      if (a.head && b.head) {
        return a.head.length - b.head.length
      }
    })
    words = words.map((word, index) => {
      word.id = index
      return word
    })
    return words
  },
  load() {
    return new Promise(async resolve => {
      let promises = [this.loadWords()]
      await Promise.all(promises)
      resolve(this)
    })
  },
  get(id) {
    return this.words[id]
  },
  lookup(text) {
    let word = this.words.find(word => word && word.bare === text)
    return word
  },
  formTable() {
    return this.tables
  },
  wordForms(word) {
    let forms = []
    if (word) {
      for (let table of this.formTable()) {
        for (let field of table.fields) {
          if (word[table.name] && word[table.name][field]) {
            for (let form of word[table.name][field].split(',')) {
              forms.push({
                table: table.name,
                field: field,
                form: form.trim()
              })
            }
          }
        }
      }
    }
    return forms
  },
  lookupFuzzy(text, limit = 30) {
    text = text.toLowerCase()
    let words = this.words
      .filter(word => word.head && word.head.startsWith(text))
      .slice(0, limit)
    if (words.length === 0) {
      words = this.words
        .filter(word => text.includes(word.head))
        .sort((a, b) => b.head.length - a.head.length)
        .slice(0, limit)
    }
    return words
  },
  randomArrayItem(array, start = 0, length = false) {
    length = length || array.length
    array = array.slice(start, length)
    let index = Math.floor(Math.random() * array.length)
    return array[index]
  },
  //https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
  randomProperty(obj) {
    var keys = Object.keys(obj)
    return obj[keys[(keys.length * Math.random()) << 0]]
  },
  random() {
    return this.randomProperty(this.words)
  },
  accent(text) {
    return text.replace(/'/g, '́')
  },
  stylize(name) {
    const stylize = {
      adjectives: 'adjective',
      incomparable: 'incomparable',
      short_f: 'short (fem.)',
      short_m: 'short (masc.)',
      short_n: 'short (neut.)',
      short_pl: 'short plural',
      superlative: 'superlative',
      conjugations: 'conjugation',
      pl1: 'мы',
      pl2: 'вы',
      pl3: 'они',
      sg1: 'я',
      sg2: 'ты',
      sg3: 'он/она',
      declensions: 'declension',
      decl_sg: 'singular',
      decl_pl: 'plural',
      decl_f: 'feminine',
      decl_m: 'masculine',
      decl_n: 'neuter',
      acc: 'accusative',
      dat: 'dative',
      gen: 'genitive',
      inst: 'instrumental',
      nom: 'nominative',
      prep: 'prepositional',
      verbs: '',
      aspect: 'aspect',
      imperative_pl: 'imperative plural',
      imperative_sg: 'imperative singular',
      partner: 'partner',
      past_f: 'past tense (feminine)',
      past_m: 'past tense (masculine)',
      past_n: 'past tense (neuter)',
      past_pl: 'past tense (plural)'
    }
    return stylize[name]
  }
}
