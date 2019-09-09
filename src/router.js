import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dictionary/'
    },
    {
      path: '/dictionary/:method?/:args?',
      name: 'dictionary',
      props: true,
      component: () => import('./views/Dictionary.vue'),
      meta: {
        title: 'Dictionary | French Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Look up and learn French words.'
          }
        ]
      }
    },
    {
      path: '/phrase/:method?/:args?',
      name: 'phrase',
      component: () => import('./views/Phrase.vue'),
      props: true,
      meta: {
        title: 'Phrase | French Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'See how French phrases are used in real context..'
          }
        ]
      }
    },
    {
      path: '/saved-words',
      name: 'saved-words',
      component: () => import('./views/SavedWords.vue'),
      meta: {
        title: 'Saved Words | French Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Study, manage, import, export the words you saved.'
          }
        ]
      }
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('./views/Library.vue'),
      props: true,
      meta: {
        title: 'Library | French Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read free, open French books with hover dictionary and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/reader/:method?/:arg?',
      name: 'reader',
      component: () => import('./views/Reader.vue'),
      meta: {
        title: 'Reader | French Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read French text with annotation and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/book/chapter/:args?',
      name: 'book-chapter',
      component: () => import('./views/BookChapter.vue'),
      props: true,
      meta: {
        title: 'Book Chapter | French Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read free, open French books with hover dictionary and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/book/index/:args?',
      name: 'book-index',
      component: () => import('./views/BookIndex.vue'),
      props: true,
      meta: {
        title: 'Book | French Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read free, open French books with hover dictionary and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/book/list/:args?',
      name: 'book-list',
      component: () => import('./views/BookList.vue'),
      props: true,
      meta: {
        title: 'Books | French Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read free, open French books with hover dictionary and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/youtube/search/:args?',
      name: 'youtube-search',
      component: () => import('./views/YouTubeSearch.vue'),
      props: true,
      meta: {
        title: 'YouTube Reader | French Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch French YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/youtube/view/:args?',
      name: 'youtube-view',
      component: () => import('./views/YouTubeView.vue'),
      props: true,
      meta: {
        title: 'YouTube Reader | French Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch French YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/youtube/browse/:args?',
      name: 'youtube-browse',
      component: () => import('./views/YouTubeBrowse.vue'),
      props: true,
      meta: {
        title: 'Study YouTube Subtitles | French Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch French YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/youtube/channel/:args?',
      name: 'youtube-channel',
      component: () => import('./views/YouTubeChannel.vue'),
      props: true,
      meta: {
        title: 'Study YouTube Subtitles | French Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch French YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/youtube/playlist/:args?',
      name: 'youtube-playlist',
      component: () => import('./views/YouTubePlaylist.vue'),
      props: true,
      meta: {
        title: 'Study YouTube Subtitles | French Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch French YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
      meta: {
        title: 'Settings | French Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Change preferences: choose a different text corpus.'
          }
        ]
      }
    }
  ]
})
