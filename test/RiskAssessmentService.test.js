'use strict';

const test = require('node:test');
const assert = require('node:assert');

const RiskAssessmentService = require('../api/services/RiskAssessmentService');

test('calculate :: risk level', async (t) => {
  await t.test('LOW when ratio is below 1', () => {
    assert.strictEqual(
      RiskAssessmentService.calculate({ offerAmount: 250000, propertyValue: 300000 }).riskLevel,
      'LOW'
    );
  });

  await t.test('MEDIUM when ratio is between 1 and 1.5 inclusive', () => {
    assert.strictEqual(
      RiskAssessmentService.calculate({ offerAmount: 350000, propertyValue: 300000 }).riskLevel,
      'MEDIUM'
    );
    assert.strictEqual(
      RiskAssessmentService.calculate({ offerAmount: 450000, propertyValue: 300000 }).riskLevel,
      'MEDIUM'
    );
  });

  await t.test('HIGH when ratio is above 1.5', () => {
    assert.strictEqual(
      RiskAssessmentService.calculate({ offerAmount: 500000, propertyValue: 300000 }).riskLevel,
      'HIGH'
    );
  });
});

test('calculate :: risk score', async (t) => {
  await t.test('scales with the ratio', () => {
    assert.strictEqual(
      RiskAssessmentService.calculate({ offerAmount: 240000, propertyValue: 300000 }).riskScore,
      40
    );
    assert.strictEqual(
      RiskAssessmentService.calculate({ offerAmount: 360000, propertyValue: 300000 }).riskScore,
      60
    );
  });

  await t.test('is capped at 100', () => {
    assert.strictEqual(
      RiskAssessmentService.calculate({ offerAmount: 750000, propertyValue: 300000 }).riskScore,
      100
    );
  });
});

test('validate :: rejects invalid input', async (t) => {
  await t.test('missing offerAmount', () => {
    assert.strictEqual(
      RiskAssessmentService.validate({ propertyValue: 300000 }),
      'offerAmount is required'
    );
  });

  await t.test('missing propertyValue', () => {
    assert.strictEqual(
      RiskAssessmentService.validate({ offerAmount: 250000 }),
      'propertyValue is required'
    );
  });

  await t.test('zero value', () => {
    assert.strictEqual(
      RiskAssessmentService.validate({ offerAmount: 250000, propertyValue: 0 }),
      'propertyValue must be greater than 0'
    );
  });

  await t.test('negative value', () => {
    assert.strictEqual(
      RiskAssessmentService.validate({ offerAmount: -1, propertyValue: 300000 }),
      'offerAmount must be greater than 0'
    );
  });

  await t.test('non-numeric value', () => {
    assert.strictEqual(
      RiskAssessmentService.validate({ offerAmount: 'abc', propertyValue: 300000 }),
      'offerAmount must be a number'
    );
  });
});

test('validate :: accepts valid input', () => {
  assert.strictEqual(
    RiskAssessmentService.validate({ offerAmount: 250000, propertyValue: 300000 }),
    null
  );
});
