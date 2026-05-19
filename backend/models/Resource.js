const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [120, 'Title too long (max 120 chars)']
    },
    link: {
      type: String,
      required: [true, 'Link is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [500, 'Description too long (max 500 chars)']
    },
    category: {
      type: String,
      enum: ['Programming', 'Design', 'Database', 'DevOps', 'AI/ML', 'General'],
      default: 'General'
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resource', ResourceSchema);