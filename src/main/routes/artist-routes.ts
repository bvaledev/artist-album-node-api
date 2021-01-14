import { Router } from 'express'
import { routeAdapter } from '@/main/adapter/express/express-routes-adapter'
import { makeAddArtistControllerFactory } from '../factory/controller/artist/add-artist/add-artist-controller'
import { makeUpdateArtistControllerFactory } from '../factory/controller/artist/update-artist/update-artist-controller'
import { makeDeleteArtistControllerFactory } from '../factory/controller/artist/delete-artist/delete-artist-controller'
import { makeLoadAllArtistControllerFactory } from '../factory/controller/artist/load-all-artist/load-all-artist-controller'
import { makeLoadByNameArtistControllerFactory } from '../factory/controller/artist/load-by-name-artist/load-by-name-artist-controller'

export default (router: Router): void => {
  // receive order, page , limit from query url
  // ?order=ASC&page=1&limit=10
  router.get('/artist', routeAdapter(makeLoadAllArtistControllerFactory()))
  router.get('/artist/find-by-name', routeAdapter(makeLoadByNameArtistControllerFactory()))
  router.post('/artist/add', routeAdapter(makeAddArtistControllerFactory()))
  router.put('/artist/:id/update', routeAdapter(makeUpdateArtistControllerFactory()))
  router.delete('/artist/:id/delete', routeAdapter(makeDeleteArtistControllerFactory()))
}
