<template>
  <div class="corpus-select">
    <table class="table table-bordered table-responsive">
      <thead>
        <tr>
          <th></th>
          <th>Corpus</th>
          <th>Code</th>
          <th>Language</th>
          <th>Words</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="corpus in SketchEngine.corpora.filter(
            corpus =>
              corpus.language_name === 'French' && (!(corpus.tags && corpus.tags.includes('learner')))
          ).sort((a,b) => b.sizes.wordcount - a.sizes.wordcount)"
        >
          <td>
            <input
              type="radio"
              :value="corpus.corpname.replace('preloaded/', '')"
              :checked="corpus.corpname.replace('preloaded/', '') === SketchEngine.corpname()"
              v-model="corpname"
            />
          </td>
          <td>{{ corpus.name }}</td>
          <td>
            <code>{{ corpus.corpname.replace('preloaded/', '') }}</code>
          </td>
          <td>{{ corpus.language_name }}</td>
          <td class="text-right">{{ Intl.NumberFormat('en-US').format(corpus.sizes.wordcount) }}</td>
          <td>
            {{ corpus.info }}
            <ul>
              <li v-if="corpus.is_featured">Featured.</li>
              <li v-if="corpus.aligned">Parallel. That means English translation is available.</li>
              <li v-if="corpus.diachronic">Diachronic. That means time information is available.</li>
              <li v-if="corpus.tags && corpus.tags.includes('spoken')">Spoken.</li>
              <li v-if="corpus.tags && corpus.tags.includes('web')">Web.</li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SketchEngine from '@/lib/sketch-engine'
export default {
  data() {
    return {
      SketchEngine,
      corpname: SketchEngine.corpname()
    }
  },
  watch: {
    corpname() {
      localStorage.setItem('fzhCorpname', this.corpname)
      location.reload() // Otherwise users won't see the new collocations and example sentences, leaving them confused.
    }
  }
}
</script>

<style></style>
