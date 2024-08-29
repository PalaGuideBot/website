import router from '@adonisjs/core/services/router'

const EventController = () => import('#event/controllers/event_controller')

router.get('/events', [EventController, 'index'])
