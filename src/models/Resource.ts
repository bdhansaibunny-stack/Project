import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'company-registration',
        'funding',
        'legal-compliance',
        'hiring',
        'branding',
        'marketing',
        'taxation',
        'fundraising',
        'ai-tools',
        'business-growth',
      ],
    },
    url: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['tool', 'article', 'course', 'community'],
      default: 'tool',
    },
  },
  { timestamps: true }
);

const Resource =
  mongoose.models.Resource || mongoose.model('Resource', resourceSchema);

export default Resource;
