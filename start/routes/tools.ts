import router from '@adonisjs/core/services/router'

const JobCalculatorController = () => import('#tools/controller/job_calculator_controller')
const ClickerController = () => import('#tools/controller/clicker_controller')

router
  .group(() => {
    router.get('/clicker/:username?', [ClickerController, 'show']).as('clicker.show')
    router.get('/job-calculator', [JobCalculatorController, 'index']).as('job_calculator.index')
  })
  .prefix('tools')
  .as('tools')
