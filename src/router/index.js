import Vue from 'vue'
import Router from 'vue-router'
import Tab from '../pages/Tab'
import Home from '../pages/home'
import Bind from '../pages/bind'
import Assessment from '../pages/assessment'
import Message from '../pages/message'
import Person from '../pages/person'
import Attendance from '../pages/attendance'
import WeeklyUpdates from '../pages/weeklyUpdates'
import AssessmentDetail from '../pages/assessment/detail'
import History from '../pages/message/history'
import SurveyList from '../pages/survey/surveyList'
import Survey from '../pages/survey/survey'
import ActivityList from '../pages/activity/activityList'
import NewsList from '../pages/news/news'
import NewsDetail from '../pages/news/newsDetail'

import { isEmptyObject } from '../util/validate'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Tab,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/message',
          name: 'message',
          component: Message,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/person',
          name: 'person',
          component: Person,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/activity',
          name: 'activity',
          component: ActivityList,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/bind',
      name: 'bind',
      component: Bind
    },
    {
      path: '/assessment',
      name: 'assessment',
      component: Assessment,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/assessment/:id/detail',
      name: 'assessmentDetail',
      component: AssessmentDetail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/attendance',
      name: 'attendance',
      component: Attendance,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/weeklyUpdates',
      name: 'weeklyUpdates',
      component: WeeklyUpdates
    },
    {
      path: '/message/:id/history',
      name: 'history',
      component: History
    },
    {
      path: '/survey',
      name: 'surveyList',
      component: SurveyList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/survey/:id/detail',
      name: 'survey',
      component: Survey,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/news',
      name: 'newsList',
      component: NewsList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/news/:id/detail',
      name: 'news',
      component: NewsDetail,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  let user = localStorage.getItem('user')
  if (to.meta.requireAuth) {
    if (token && !isEmptyObject(user)) {
      next()
    } else {
      next({
        path: '/bind',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

export default router
