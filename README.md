<img width="1470" height="956" alt="image" src="https://github.com/user-attachments/assets/45c4e5ae-4e4e-4f90-b1a9-3fb474f33d6d" />

<img width="1470" height="956" alt="image" src="https://github.com/user-attachments/assets/24692727-4029-4d3f-ac2c-3f1277e297cc" />


https://www.loom.com/share/4b9da03d14834e86913d027d76266a6c







# Blockchain Backend Engineer Take-Home Assignment

## Overview

Thank you for your interest in joining our team.

This assignment is designed to evaluate your backend engineering skills, code quality, API design, testing practices, and problem-solving approach in a blockchain-related application.

**Expected completion time:** Approximately 1 hour

---

## Objective

Implement a new API endpoint that analyzes the risk level of a property offer.

The endpoint should calculate a risk score based on the relationship between the offer amount and the property's market value.

---

## Task

Create the following endpoint:

```http
POST /offers/risk-score
```

### Request Body

```json
{
  "offerAmount": 500000,
  "propertyValue": 300000
}
```

### Response Example

```json
{
  "riskScore": 85,
  "riskLevel": "HIGH"
}
```

---

## Risk Rules

Determine the risk level using the following criteria:

| Offer Amount vs Property Value | Risk Level |
| ------------------------------ | ---------- |
| Less than 100%                 | LOW        |
| Between 100% and 150%          | MEDIUM     |
| Greater than 150%              | HIGH       |

Examples:

| Offer Amount | Property Value | Risk Level |
| ------------ | -------------- | ---------- |
| 250,000      | 300,000        | LOW        |
| 350,000      | 300,000        | MEDIUM     |
| 500,000      | 300,000        | HIGH       |

---

## Risk Score Calculation

You may use the following formula:

```text
ratio = offerAmount / propertyValue

riskScore = min(100, round(ratio * 50))
```

Examples:

| Ratio | Risk Score |
| ----- | ---------- |
| 0.8   | 40         |
| 1.2   | 60         |
| 1.7   | 85         |
| 2.5   | 100        |

---

## Requirements

### Functional Requirements

* Implement the endpoint.
* Validate incoming request data.
* Return appropriate HTTP status codes.
* Handle invalid or missing inputs.
* Return meaningful error messages.

### Technical Requirements

* Follow the existing project architecture.
* Keep business logic separate from route/controller logic.
* Write clean and maintainable code.
* Add unit tests for the risk calculation logic.

---

## Validation Rules

The API should reject requests when:

* `offerAmount` is missing
* `propertyValue` is missing
* Either value is zero
* Either value is negative
* Either value is not a number

Example error response:

```json
{
  "message": "propertyValue must be greater than 0"
}
```

---

## Deliverables

Submit:

1. Source code changes
2. Unit tests
3. Brief explanation of your implementation approach

---

## Evaluation Criteria

| Category                    | Weight |
| --------------------------- | ------ |
| Correctness                 | 25%    |
| Code Quality                | 30%    |
| Architecture & Organization | 20%    |
| Error Handling & Validation | 15%    |
| Test Coverage               | 10%    |

---

## Bonus (Optional)

If time permits:

* Add API documentation.
* Add integration tests.
* Make risk thresholds configurable.

---

## Notes

* You are free to use any libraries already available in the project.
* Focus on readability and maintainability.
* Production-grade perfection is not expected; we are primarily evaluating engineering judgment and code quality.

Good luck!
