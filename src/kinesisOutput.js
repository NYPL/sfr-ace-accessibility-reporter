import AWS from 'aws-sdk'

AWS.config.update({
  region: 'us-east-1',
  logger: process.stdout
})

var customKinEndpoint
if (process.env.AWS_KINESIS_ENDPOINT) {
  customKinEndpoint = {
    endpoint: process.env.AWS_KINESIS_ENDPOINT
  }
}

const kinesis = new AWS.Kinesis(customKinEndpoint)

exports.resultHandler = (handleResp) => {
  return new Promise((resolve, reject) => {
    let outParams = {
      Data: JSON.stringify(handleResp),
      PartitionKey: process.env.AWS_KINESIS_STREAMID,
      StreamName: process.env.AWS_KINESIS_STREAMNAME
    }
    console.log(outParams)
    let kinesisOut = kinesis.putRecord(outParams).promise()
    kinesisOut.then((data) => {
      resolve(data)
    }).catch((err) => {
      resolve(err)
    })
  })
}
