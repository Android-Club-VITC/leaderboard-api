module.exports = {
    calculateScore: [
        {
          '$addFields': {
            'score': {
              '$sum': '$timeline.points'
            }
          }
        }
      ]
}