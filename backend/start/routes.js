
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/files/:file', 'FileController.show')

Route.post('/sessions', 'SessionController.store').validator('Session')
Route.post('/forgot', 'ForgotPasswordController.store').validator('Forgot')
Route.post('/reset', 'ResetPasswordController.store').validator('Reset')

Route.group(() => {
  Route.put('/profile', 'ProfileController.update').validator('Profile')

  Route.get('/workshops', 'WorkshopController.index')
  Route.get('/workshops/:id', 'WorkshopController.show')
  
  Route.post('/workshops', 'WorkshopController.store').validator('Workshop')
  Route.put('/workshops/:id', 'WorkshopController.update').validator('Workshop')

  Route.delete('/workshops/:id', 'WorkshopController.destroy')

}).middleware('auth')

