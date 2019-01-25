import express from 'express'
import AccessiblityRep from '../accessibility_report'

const router = express.Router()

router.get('/', async (req, res) => {
  res.send({
    'status': 200,
    'code': 'service-up',
    'data': {
      'message': 'Report Service Running'
    }
  })
})

export { router }
