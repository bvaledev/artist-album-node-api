import { Router } from 'express'
import { routeAdapter } from '@/main/adapter/express/express-routes-adapter'
import { makeAddArtistControllerFactory } from '../factory/controller/artist/add-artist-controller'

export default (router: Router): void => {
  router.post('/artist/add', routeAdapter(makeAddArtistControllerFactory()))
}
