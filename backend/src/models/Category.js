const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a category name'],
      trim: true,
      unique: true,
      maxlength: [50, 'Category name cannot be more than 50 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'Description cannot be more than 200 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
      default: '#6B7280', // Default gray color
      validate: {
        validator: function(v) {
          return /^#[0-9A-F]{6}$/i.test(v);
        },
        message: 'Color must be a valid hex color code'
      }
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Create slug from name before saving
CategorySchema.pre('save', function (next) {
  if (!this.isModified('name')) {
    return next();
  }
  
  this.slug = this.name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
    
  next();
});

// Ensure slug is unique
CategorySchema.pre('save', async function (next) {
  if (this.isModified('slug')) {
    const existingCategory = await this.constructor.findOne({ 
      slug: this.slug, 
      _id: { $ne: this._id } 
    });
    
    if (existingCategory) {
      this.slug = `${this.slug}-${Date.now()}`;
    }
  }
  next();
});

// Virtual for category URL
CategorySchema.virtual('url').get(function () {
  return `/categories/${this.slug}`;
});

// Method to get posts count
CategorySchema.methods.getPostsCount = async function() {
  const Post = require('./Post');
  return await Post.countDocuments({ category: this._id });
};

module.exports = mongoose.model('Category', CategorySchema);
