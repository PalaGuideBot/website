import router from '@adonisjs/core/services/router'

const ClickerController = () => import('#tools/controller/clicker_controller')
const JobCalculatorController = () => import('#tools/controller/job_calculator_controller')
const PogCalculatorController = () => import('#tools/controller/pog_calculator_controller')

router
  .group(() => {
    router.get('/', ({ inertia }) => inertia.render('tools/index', {})).as('index')
    router.get('/clicker/:username?', [ClickerController, 'show']).as('clicker.show')
    router.get('/job-calculator', [JobCalculatorController, 'index']).as('job_calculator.index')
    router.get('/pog-calculator', [PogCalculatorController, 'index']).as('pog_calculator.index')
  })
  .prefix('tools')
  .as('tools')
