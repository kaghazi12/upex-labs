import mongoose from 'mongoose';
import crypto from 'crypto';

const SubmissionSchema = new mongoose.Schema({
  submissionId: {
    type: String,
    default: () => crypto.randomUUID(),
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  selectedPlan: {
    name: String,
    oneTimePrice: Number,
    monthlyPrice: Number
  },
  addOns: [
    {
      name: String,
      type: { type: String, enum: ["one-time", "monthly"] },
      price: Number
    }
  ],
  totals: {
    oneTime: Number,
    monthly: Number
  },
  businessInfo: {
    businessName: String,
    industry: String,
    description: String,
    targetAudience: String,
    websiteGoals: [String]
  },
  designPreferences: {
    brandColors: [String],
    designStyle: String,
    referenceUrls: [String],
    logoFile: {
      filename: String,
      size: Number,
      type: { type: String } 
    }
  },
  websiteContent: {
    numberOfPages: Number,
    pageNames: [String],
    hasExistingContent: Boolean,
    contentFile: {
      filename: String,
      size: Number,
      type: { type: String }
    },
    needsBlog: Boolean,
    needsEcommerce: Boolean
  },
  featuresAndIntegrations: {
    aiChatbot: Boolean,
    chatbotAddOns: [String],
    voiceAI: Boolean,
    voiceAITier: { type: String, enum: ["basic", "pro", null], default: null },
    contactForm: Boolean,
    bookingSystem: Boolean,
    socialMediaLinks: Object,
    googleAnalytics: Boolean,
    otherRequests: String
  },
  timeline: {
    desiredLaunchDate: Date,
    budgetFlexibility: String,
    referralSource: String,
    additionalNotes: String
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"],
    default: "pending"
  }
});

const Submission = mongoose.model('Submission', SubmissionSchema);

export default Submission;
