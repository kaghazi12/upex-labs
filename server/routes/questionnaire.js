import express from 'express';
import { body, validationResult } from 'express-validator';
import Submission from '../models/Submission.js';

const router = express.Router();

// Helper: Parse string price (e.g. "$3,500") to Number
const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  if (typeof priceStr === 'number') return priceStr;
  return Number(priceStr.replace(/[^0-9.-]+/g, '')) || 0;
};

// POST /api/questionnaire/submit
router.post('/submit',
  body('plan').isObject().notEmpty(),
  body('plan.name').isString().notEmpty(),
  body('businessName').isString().notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const data = req.body;

      // Extract chatbot add-ons
      const chatbotAddOns = [];
      if (data.addons?.chatWidgetOnWebsite) chatbotAddOns.push('Chat Widget on Website');
      if (data.addons?.trainOnCustomDocs) chatbotAddOns.push('Train on Custom Docs/FAQs');

      // Determine Voice AI Tier
      let voiceAITier = null;
      if (data.addons?.voiceAIBasic) voiceAITier = 'basic';
      if (data.addons?.voiceAIPro) voiceAITier = 'pro';

      // Map addOns array for schema
      const mappedAddOns = (data.activeAddons || []).map(addon => {
        let type = 'monthly';
        let price = addon.monthly;
        if (addon.oneTime > 0) {
          type = 'one-time';
          price = addon.oneTime;
        }
        return {
          name: addon.label,
          type,
          price
        };
      });

      const submission = new Submission({
        selectedPlan: {
          name: data.plan.name,
          oneTimePrice: parsePrice(data.plan.setupPrice),
          monthlyPrice: parsePrice(data.plan.retainerPrice)
        },
        addOns: mappedAddOns,
        totals: {
          oneTime: data.totals?.totalOneTime || 0,
          monthly: data.totals?.totalMonthly || 0
        },
        businessInfo: {
          businessName: data.businessName,
          industry: data.industry,
          description: data.businessDescription,
          targetAudience: data.targetAudience,
          websiteGoals: data.websiteGoals || []
        },
        designPreferences: {
          brandColors: data.brandColors || [],
          designStyle: data.designStyle,
          referenceUrls: data.referenceWebsites || [],
          logoFile: data.logoFile ? {
            filename: data.logoFile.name,
            size: data.logoFile.size,
            type: data.logoFile.type
          } : undefined
        },
        websiteContent: {
          numberOfPages: data.numberOfPages,
          pageNames: data.pageNames || [],
          hasExistingContent: data.hasExistingContent,
          contentFile: data.contentFile ? {
            filename: data.contentFile.name,
            size: data.contentFile.size,
            type: data.contentFile.type
          } : undefined,
          needsBlog: data.needsBlog,
          needsEcommerce: data.needsEcommerce
        },
        featuresAndIntegrations: {
          aiChatbot: data.wantsAIChatbot,
          chatbotAddOns,
          voiceAI: data.wantsVoiceAI,
          voiceAITier,
          contactForm: data.wantsContactForm,
          bookingSystem: data.wantsBookingSystem,
          socialMediaLinks: data.socialLinks || {},
          googleAnalytics: data.wantsAnalytics,
          otherRequests: data.otherRequests
        },
        timeline: {
          desiredLaunchDate: data.desiredLaunchDate ? new Date(data.desiredLaunchDate) : undefined,
          budgetFlexibility: data.budgetFlexibility,
          referralSource: data.howDidYouHear,
          additionalNotes: data.additionalNotes
        }
      });

      const savedSubmission = await submission.save();
      
      console.log(`Questionnaire saved to MongoDB: ${savedSubmission.submissionId}`);

      res.status(201).json({
        submissionId: savedSubmission.submissionId,
        createdAt: savedSubmission.createdAt,
        message: 'Questionnaire submitted successfully',
      });
    } catch (error) {
      console.error('Questionnaire submission error:', error);
      res.status(500).json({
        error: 'Failed to save questionnaire submission to database. Please try again.',
        details: error.message
      });
    }
  }
);

// GET /api/questionnaire/submissions
router.get('/submissions', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    res.json(submissions);
  } catch (error) {
    console.error('Fetch submissions error:', error);
    res.status(500).json({ error: 'Failed to fetch submissions.' });
  }
});

// GET /api/questionnaire/submissions/:submissionId
router.get('/submissions/:submissionId', async (req, res) => {
  try {
    const submission = await Submission.findOne({ submissionId: req.params.submissionId });
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    console.error('Fetch submission error:', error);
    res.status(500).json({ error: 'Failed to fetch submission.' });
  }
});

export default router;
