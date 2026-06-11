"use strict";

/**
 * RiskAssessmentService
 *
 * Pure business logic for assessing the risk of a property offer. It has no
 * knowledge of HTTP or Express, which keeps it easy to unit test and reuse.
 */
module.exports = {
  /**
   * Validate the risk assessment input.
   *
   * @param {{offerAmount: *, propertyValue: *}} input
   * @return {?string} an error message, or null when the input is valid
   */
  validate({ offerAmount, propertyValue } = {}) {
    return (
      this._validateAmount(offerAmount, "offerAmount") ||
      this._validateAmount(propertyValue, "propertyValue")
    );
  },

  /**
   * Calculate the risk level and score for a valid offer/property pair.
   *
   * @param {{offerAmount: number, propertyValue: number}} input
   * @return {{riskScore: number, riskLevel: string}}
   */
  calculate({ offerAmount, propertyValue }) {
    const ratio = offerAmount / propertyValue;

    let riskLevel;
    if (ratio < 1) {
      riskLevel = "LOW";
    } else if (ratio <= 1.5) {
      riskLevel = "MEDIUM";
    } else {
      riskLevel = "HIGH";
    }

    const riskScore = Math.min(100, Math.round(ratio * 50));

    return { riskScore, riskLevel };
  },

  /**
   * Validate a single monetary field: must be a positive number.
   *
   * @param {*} value
   * @param {string} fieldName
   * @return {?string} an error message, or null when valid
   */
  _validateAmount(value, fieldName) {
    if (value === undefined || value === null || value === "") {
      return `${fieldName} is required`;
    }

    if (typeof value !== "number" || !Number.isFinite(value)) {
      return `${fieldName} must be a number`;
    }

    if (value <= 0) {
      return `${fieldName} must be greater than 0`;
    }

    return null;
  },
};
