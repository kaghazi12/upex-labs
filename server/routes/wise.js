import express from 'express';
import axios from 'axios';
import { body, validationResult } from 'express-validator';

const router = express.Router();

const WISE_API_BASE = 'https://api.sandbox.transferwise.tech';

// Axios instance with default headers for Wise API
const getWiseClient = () => {
  if (!process.env.WISE_API_TOKEN) {
    throw new Error('WISE_API_TOKEN is missing in environment variables.');
  }
  return axios.create({
    baseURL: WISE_API_BASE,
    headers: {
      Authorization: `Bearer ${process.env.WISE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });
};

// 1. Create a Quote
router.post('/quote', 
  body('sourceCurrency').isString().notEmpty(),
  body('targetCurrency').isString().notEmpty(),
  body('amount').isNumeric().notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { sourceCurrency, targetCurrency, amount } = req.body;
      const profileId = process.env.WISE_PROFILE_ID;

      if (!profileId) {
        return res.status(500).json({ error: 'WISE_PROFILE_ID is missing in environment variables.' });
      }

      const wiseClient = getWiseClient();
      
      const response = await wiseClient.post(`/v3/profiles/${profileId}/quotes`, {
        sourceCurrency,
        targetCurrency,
        sourceAmount: amount, // or targetAmount, assuming sourceAmount here
      });

      res.json({
        id: response.data.id,
        rate: response.data.rate,
        paymentOptions: response.data.paymentOptions
      });
    } catch (error) {
      console.error('Quote Error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.errors || error.message || 'Failed to create quote'
      });
    }
});

// 2. Create a Recipient
router.post('/recipient',
  body('accountHolderName').isString().notEmpty(),
  body('currency').isString().notEmpty(),
  body('iban').isString().notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { accountHolderName, currency, iban } = req.body;
      const profileId = process.env.WISE_PROFILE_ID;
      
      const wiseClient = getWiseClient();

      const response = await wiseClient.post('/v1/accounts', {
        profile: profileId,
        currency,
        type: 'iban',
        accountHolderName,
        details: {
          IBAN: iban
        }
      });

      res.json({
        recipientId: response.data.id
      });
    } catch (error) {
      console.error('Recipient Error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.errors || error.message || 'Failed to create recipient'
      });
    }
});

// 3. Create a Transfer
router.post('/transfer',
  body('quoteId').isString().notEmpty(),
  body('recipientId').isNumeric().notEmpty(),
  body('reference').isString().optional(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { quoteId, recipientId, reference } = req.body;
      const wiseClient = getWiseClient();

      const response = await wiseClient.post('/v1/transfers', {
        targetAccount: recipientId,
        quoteUuid: quoteId,
        customerTransactionId: reference || `ref-${Date.now()}`,
        details: {
          reference: reference || 'Service Payment'
        }
      });

      res.json({
        transferId: response.data.id
      });
    } catch (error) {
      console.error('Transfer Error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.errors || error.message || 'Failed to create transfer'
      });
    }
});

// 4. Fund a Transfer
router.post('/fund',
  body('transferId').isNumeric().notEmpty(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { transferId } = req.body;
      const profileId = process.env.WISE_PROFILE_ID;
      const wiseClient = getWiseClient();

      // In sandbox, we can fund from balance
      const response = await wiseClient.post(`/v3/profiles/${profileId}/transfers/${transferId}/payments`, {
        type: 'BALANCE'
      });

      res.json({
        status: response.data.status,
        errorCode: response.data.errorCode
      });
    } catch (error) {
      console.error('Fund Error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({
        error: error.response?.data?.errors || error.message || 'Failed to fund transfer'
      });
    }
});

export default router;
