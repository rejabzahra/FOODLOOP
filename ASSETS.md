# 📸 FOOD LOOP - Image Assets & Resources

## 🖼️ Image Usage Guide

FOOD LOOP uses high-quality images from Unsplash and other sources to create an engaging, professional user experience.

### Current Image Sources

#### Landing Page
- **Hero Background**: Unsplash food donation/community image
  - URL: `https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=1920&h=1080&fit=crop`
  - Theme: Community food sharing, warm atmosphere

#### Feature Cards (What Our Platform Does)
1. **Food Donation**:
   - URL: `https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&h=400&fit=crop`
   - Theme: Food donation, generosity

2. **Community Support**:
   - URL: `https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop`
   - Theme: Volunteers, community involvement

3. **Zero Waste**:
   - URL: `https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop`
   - Theme: Sustainability, environmental care

#### About Us - Founders
1. **Founder 1 (Alex Thompson)**:
   - URL: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop`
   - Theme: Professional portrait

2. **Founder 2 (Sarah Martinez)**:
   - URL: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop`
   - Theme: Professional portrait

## 📁 Local Image Storage (Optional)

To use local images instead of external URLs:

1. **Create images directory**:
   ```bash
   mkdir -p client/public/images
   ```

2. **Organize images by category**:
   ```
   client/public/images/
   ├── hero/
   │   └── hero-background.jpg
   ├── features/
   │   ├── food-donation.jpg
   │   ├── community-support.jpg
   │   └── zero-waste.jpg
   ├── founders/
   │   ├── founder-1.jpg
   │   └── founder-2.jpg
   └── donations/
       └── (user-uploaded donation images)
   ```

3. **Update image URLs in components**:
   - Replace Unsplash URLs with: `/images/[category]/[filename].jpg`

## 🎨 Image Guidelines

### Recommended Specifications
- **Hero Images**: 1920x1080px (16:9 aspect ratio)
- **Feature Cards**: 600x400px (3:2 aspect ratio)
- **Founder Photos**: 400x400px (1:1 square)
- **Donation Images**: 800x600px (4:3 aspect ratio)
- **Format**: JPG or WebP for photos, PNG for logos/icons
- **Optimization**: Compress images for web (use tools like TinyPNG)

### Content Themes
- Warm, inviting atmosphere
- Diverse communities
- Fresh, healthy food
- People helping people
- Sustainability and care
- Professional yet approachable

## 🔄 Replacing Images

### Method 1: Update Component URLs
Edit the image URLs directly in the component files:
- `client/src/pages/LandingPage.js` - Feature cards
- `client/src/pages/AboutUs.js` - Founder photos

### Method 2: Use Local Assets
1. Place images in `client/public/images/`
2. Update URLs to reference `/images/[path]`
3. Images will be served from the public folder

## 🌐 Alternative Image Sources

If you want to use different images:

### Free Image Sources
- **Unsplash**: https://unsplash.com (used currently)
- **Pexels**: https://www.pexels.com
- **Pixabay**: https://pixabay.com
- **FoodiesFeed**: https://www.foodiesfeed.com (food-specific)

### Search Keywords
- "food donation"
- "community service"
- "volunteers"
- "food sharing"
- "sustainability"
- "zero waste"
- "helping others"
- "community meal"

## 📝 Notes

- All external images are loaded from Unsplash CDN (fast and reliable)
- Images are optimized with query parameters (`w=`, `h=`, `fit=crop`)
- For production, consider hosting images on your own CDN or server
- Ensure all images have proper alt text for accessibility
- Check image licenses before using in commercial projects

## 🚀 Production Recommendations

1. **Host images locally or on CDN** for better control
2. **Implement image lazy loading** for better performance
3. **Use WebP format** for better compression
4. **Add image upload functionality** for user-generated content (donations)
5. **Implement image optimization** service (e.g., Cloudinary, Imgix)
