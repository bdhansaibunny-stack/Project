import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
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
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: 'Startup Navigator',
    },
    tags: [String],
    readTime: {
      type: Number,
      default: 5,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Article = mongoose.models.Article || mongoose.model('Article', articleSchema);

export default Article;
