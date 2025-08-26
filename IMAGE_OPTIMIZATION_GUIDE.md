# Image Optimization Guide

This guide explains how to optimize images in your Next.js project to reduce file sizes while maintaining quality.

### 1. Client-Side Image Optimization
- **Automatic compression** before upload to Supabase
- **Size reduction**: 70-90% smaller files
- **Quality preservation**: Maintains visual quality
- **Real-time feedback**: Shows optimization progress and results

### 2. Next.js Image Optimization
- **Automatic format conversion**: WebP and AVIF support
- **Responsive images**: Different sizes for different devices
- **Lazy loading**: Images load only when needed
- **Progressive loading**: Smooth loading experience

### 3. Optimized Components
- `OptimizedImage`: Reusable component with built-in optimization
- `ArtUploadForm`: Enhanced with automatic image compression

## 📊 Expected Results

| Original Size | Optimized Size | Reduction |
|---------------|----------------|-----------|
| 25MB | 2-5MB | 80-90% |
| 10MB | 1-2MB | 80-85% |
| 5MB | 500KB-1MB | 80-85% |

## 🛠️ How to Use

### For New Image Uploads

The `ArtUploadForm` component now automatically optimizes images:

```tsx
// Images are automatically optimized before upload
<ArtUploadForm />
```

### For Displaying Images

Use the `OptimizedImage` component instead of regular `<img>` tags:

```tsx
import OptimizedImage from '@/components/ui/optimized-image';

// Basic usage
<OptimizedImage 
  src="your-image-url" 
  alt="Description" 
  width={800} 
  height={600} 
/>

// With fill (for responsive layouts)
<OptimizedImage 
  src="your-image-url" 
  alt="Description" 
  fill 
  className="aspect-square" 
/>

// With click handler (for modals)
<OptimizedImage 
  src="your-image-url" 
  alt="Description" 
  width={400} 
  height={300} 
  onClick={() => openModal()} 
/>
```

### Manual Image Optimization

Use the utility function for custom optimization:

```tsx
import { optimizeImage } from '@/lib/utils';

const handleFileOptimization = async (file: File) => {
  try {
    const optimizedFile = await optimizeImage(file, {
      maxWidth: 1920,
      maxHeight: 1920,
      quality: 0.8,
      format: 'jpeg'
    });
    
    console.log('Original size:', file.size);
    console.log('Optimized size:', optimizedFile.size);
  } catch (error) {
    console.error('Optimization failed:', error);
  }
};
```

## ⚙️ Configuration Options

### Image Optimization Settings

```tsx
interface ImageOptimizationOptions {
  maxWidth?: number;    // Default: 1920px
  maxHeight?: number;   // Default: 1920px
  quality?: number;     // Default: 0.8 (80%)
  format?: 'jpeg' | 'webp' | 'png'; // Default: 'jpeg'
}
```

### Next.js Image Configuration

The `next.config.ts` includes:
- **WebP and AVIF support** for modern browsers
- **Responsive breakpoints** for different screen sizes
- **Supabase domain whitelist** for external images

## 🎯 Best Practices

### 1. Upload Optimization
- Always use the optimized upload form
- Monitor the size reduction feedback
- Consider quality settings based on image type

### 2. Display Optimization
- Use `OptimizedImage` component for all images
- Set appropriate `sizes` prop for responsive images
- Use `priority` for above-the-fold images

### 3. Quality vs Size Balance
- **Photos**: 80-85% quality (good balance)
- **Graphics/Logos**: 90-95% quality (preserve sharpness)
- **Thumbnails**: 70-75% quality (smaller files)

### 4. Format Selection
- **JPEG**: Best for photos (smallest size)
- **WebP**: Best for web (modern browsers)
- **PNG**: Best for graphics with transparency

## 🔧 Advanced Usage

### Custom Optimization Profiles

```tsx
// High quality for important images
const highQualityProfile = {
  maxWidth: 2560,
  maxHeight: 2560,
  quality: 0.9,
  format: 'webp' as const
};

// Thumbnail profile
const thumbnailProfile = {
  maxWidth: 400,
  maxHeight: 400,
  quality: 0.7,
  format: 'jpeg' as const
};

const optimizedFile = await optimizeImage(file, highQualityProfile);
```

### Batch Optimization

```tsx
const optimizeMultipleImages = async (files: File[]) => {
  const optimizedFiles = await Promise.all(
    files.map(file => optimizeImage(file))
  );
  return optimizedFiles;
};
```

## 📈 Performance Benefits

1. **Faster Uploads**: Smaller files upload quicker
2. **Reduced Storage Costs**: Less space used on Supabase
3. **Faster Page Loads**: Optimized images load faster
4. **Better User Experience**: Progressive loading and responsive images
5. **SEO Benefits**: Faster loading improves search rankings

## 🐛 Troubleshooting

### Common Issues

1. **Optimization fails**: Check browser console for errors
2. **Images not loading**: Verify Supabase URL configuration
3. **Poor quality**: Adjust quality settings (increase if needed)
4. **Large file sizes**: Check if optimization is running

### Debug Mode

Add console logs to track optimization:

```tsx
const handleFileChange = async (file: File) => {
  console.log('Original file size:', formatFileSize(file.size));
  
  const optimized = await optimizeImage(file);
  console.log('Optimized file size:', formatFileSize(optimized.size));
  
  const reduction = calculateSizeReduction(file.size, optimized.size);
  console.log('Size reduction:', reduction);
};
```

## 🔄 Migration Guide

### For Existing Images

1. **Gradual replacement**: Replace images as you update content
2. **Batch processing**: Use the optimization utilities for existing files
3. **CDN benefits**: Next.js Image component provides additional optimization

### For New Development

1. Always use `OptimizedImage` component
2. Use the enhanced upload forms
3. Test different quality settings for your use case

## 📚 Additional Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [WebP Format Guide](https://developers.google.com/speed/webp)
- [Image Compression Best Practices](https://web.dev/fast/#optimize-your-images)
