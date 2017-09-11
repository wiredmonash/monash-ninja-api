const CodeModel = require('../models/Code')
const json2csv = require('json2csv')

exports.exportAsCSV = {
  auth: 'simple',
  handler: (req, res) => {
    CodeModel.getAllCodes((err, codes) => {
      if (err) throw err
      const fields = [ 'code', 'studentId', 'email' ]
      let csv = json2csv({
        data: codes,
        fields: fields
      })

      return res(csv).type('text/csv')
    })
  }
}
