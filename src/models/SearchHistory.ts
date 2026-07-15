import mongoose from 'mongoose';

const searchHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    query: {
      type: String,
      required: true,
    },
    results: {
      type: Number,
      default: 0,
    },
    aiResponse: {
      type: String,
    },
  },
  { timestamps: true }
);

const SearchHistory =
  mongoose.models.SearchHistory ||
  mongoose.model('SearchHistory', searchHistorySchema);

export default SearchHistory;
