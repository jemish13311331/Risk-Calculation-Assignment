'use strict';

const RiskAssessmentService = require('../services/RiskAssessmentService');
const log = require('../../server/logger');

module.exports = {
  async calculateRiskScore(req, res) {
    const error = RiskAssessmentService.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error });
    }

    const result = RiskAssessmentService.calculate(req.body);

    log.info(`Risk assessed :: level ${result.riskLevel}, score ${result.riskScore}`);

    res.status(200).json(result);
  }
};
