import { Router } from 'express'
import { routeAdapter } from '@/main/adapter/express/express-routes-adapter'
import { makeLoadAllAlbumControllerFactory } from '../factory/controller/album/load-all-album/load-all-album-controller'
import { makeLoadByNameAlbumControllerFactory } from '../factory/controller/album/load-by-name-album/load-by-name-album-controller'
import { makeLoadByArtistAlbumControllerFactory } from '../factory/controller/album/load-by-artist-album/load-by-artist-album-controller'
import { makeAddAlbumControllerFactory } from '../factory/controller/album/add-album/add-album-controller'
import { makeUpdateAlbumControllerFactory } from '../factory/controller/album/update-artist/update-artist-controller'
import { makeDeleteAlbumControllerFactory } from '../factory/controller/album/delete-album/delete-album-controller'

export default (router: Router): void => {
  // receive order, page , limit from query url
  // ?order=ASC&page=1&limit=10
  router.get('/album', routeAdapter(makeLoadAllAlbumControllerFactory()))
  router.get('/album/find-by-name', routeAdapter(makeLoadByNameAlbumControllerFactory()))
  router.get('/album/find-by-artist', routeAdapter(makeLoadByArtistAlbumControllerFactory()))
  router.post('/album/add', routeAdapter(makeAddAlbumControllerFactory()))
  router.put('/album/:id/update', routeAdapter(makeUpdateAlbumControllerFactory()))
  router.delete('/album/:id/delete', routeAdapter(makeDeleteAlbumControllerFactory()))
}
