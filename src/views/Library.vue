<template>
  <div class="container pt-5 pb-5 main" id="library">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="mb-5 text-center">Library</h1>
        <p class="text-center lead" style="margin-bottom: 5rem">
          This is where you can enjoy reading a variety of French books with the
          help of hover dictionary and the ability to save words.
        </p>

        <hr class="mb-5" />

        <h3 class="text-center mt-5" style="margin-bottom:4rem">Browse Authors on Wikisource</h3>

        <ul class="list-unstyled p-0 mb-5 booklists">
          <li v-for="booklist in booklists" class="text-center mb-5">
            <a
              class="link-unstyled"
              :href="`#/book/list/${encodeURIComponent(booklist.url)}`"
            >
              <img
                :src="`/img/books-${Math.floor(Math.random() * 10)}.png`"
                class="shadowed book-thumb mb-4"
              />
              <h5 class="mt-3">
                <Annotate tag="b"
                  ><span>{{ booklist.title }}</span></Annotate
                >
              </h5>
            </a>
          </li>
        </ul>

        <hr class="mb-5" />

        <h3 class="text-center mt-5 mb-4">Custom Reading</h3>

        <p class="text-center lead mb-5">
          Read
          <em>any</em> book by pasting the URL
        </p>

        <div class="jumbotron bg-light pt-4 pb-3 mt-3 mb-3">
          <SimpleSearch
            placeholder="Enter the URL of a book from one of the above sites"
            :action="
              url => {
                location.hash = '#/book/index/' + encodeURIComponent(url)
              }
            "
            class="mb-3"
            ref="search"
          />
          <p>
            We can work with these content providers.
            <b>Copy paste</b> URLs like the following into the above text box
            and enjoy reading!
          </p>
          <ul>
            <li v-for="source in Library.sources">
              {{ source.name }}, example URL:
              <code v-html="`${source.example}`"></code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Library from '@/lib/library'
import SimpleSearch from '@/components/SimpleSearch'

export default {
  components: {
    SimpleSearch
  },
  props: {
    args: {
      type: String
    }
  },
  data() {
    return {
      Library,
      location,
      booklists: [
      ]
    }
  },
  mounted() {
    for(let letter of ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']) {
      this.booklists.push({
        title: letter,
        url: 'https://fr.wikisource.org/wiki/Cat%C3%A9gorie:Auteurs-' + letter
      })
    }
    this.booklists
  }
}
</script>

<style lang="scss">
.booklists {
  display: flex;
  flex-wrap: wrap;
}
.booklists li {
  flex: 1;
  min-width: 15rem;
}
</style>
