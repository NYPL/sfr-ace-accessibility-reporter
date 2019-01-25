import express from 'express'
import AccessiblityRep from '../accessibility_report'
import { resultHandler } from '../kinesisOutput'

const router = express.Router()

router.post('/generate_report', (req, res) => {
  
  res.send({
    'status': 200,
    'code': 'acknowledged'
  })
  
  const dataBlock = req.body
  const bufData = Buffer.from(dataBlock.epubData)

  AccessiblityRep.runAccessibilityReport(bufData).then((reportData) => {
    reportData.instanceID = dataBlock.instanceID
    reportData.identifier = dataBlock.identifier
    const report = {
      status: 200,
      code: 'accessibility',
      message: 'Created Accessibility Score',
      type: 'access_report',
      method: 'insert',
      data: reportData,
    }
    resultHandler(report)
  }).catch((err) => {
    const errReport = {
      'status': 500,
      'code': 'accessibility-report',
      'data': err
    }
    console.log(errReport)
    resultHandler(errReport)
  })
})

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
