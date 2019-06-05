import Vue from 'vue'
import Router from 'vue-router'
import Forecast from '@/views/Forecast'
import CitySearch from '@/views/CitySearch'
import CurrentWeather from '@/views/CurrentWeather'
import Seattle from '@/views/Seattle'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CitySearch',
      component: CitySearch
    },
      {
          path: '/:cityId/current',
          name: 'CurrentWeather',
          component: CurrentWeather
      },
      {
          path: '/:cityId/forecast',
          name: 'Forecast',
          component: Forecast
      },
      {
          path: '/Seattle',
          name: 'Seattle',
          component: Seattle
      }

  ]
})
