'use client';
import { useState } from 'react';
import supabase from '@/lib/supabase';
import { optimizeImage, formatFileSize, calculateSizeReduction } from '@/lib/utils';

export default function ArtUploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [optimizing, setOptimizing] = useState(false);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [optimizedSize, setOptimizedSize] = useState<number | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setOriginalSize(selectedFile.size);
    setOptimizedSize(null);
    setMessage(null);

    // Show optimization in progress
    setOptimizing(true);
    
    try {
      const optimizedFile = await optimizeImage(selectedFile);
      setFile(optimizedFile);
      setOptimizedSize(optimizedFile.size);
      
      const reduction = calculateSizeReduction(originalSize!, optimizedFile.size);
      setMessage(`Image optimized! Size reduced by ${reduction} (${formatFileSize(originalSize!)} → ${formatFileSize(optimizedFile.size)})`);
    } catch (error) {
      setMessage('Failed to optimize image. Using original file.');
    } finally {
      setOptimizing(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    setUploading(true);

    // 1. Upload to Supabase Storage
    const filePath = `public/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from('art') // your bucket name
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      setMessage('Upload error: ' + uploadError.message);
      setUploading(false);
      return;
    }

    // 2. Get public URL
    const { data: urlData } = supabase
      .storage
      .from('art')
      .getPublicUrl(filePath);

    const image_url = urlData.publicUrl;

    // 3. Insert into DB
    const { error: dbError } = await supabase
      .from('art_images')
      .insert([{ title, description, image_url }]);

    if (dbError) {
      setMessage('DB error: ' + dbError.message);
    } else {
      setMessage('Upload successful!');
      setTitle('');
      setDescription('');
      setFile(null);
      setOriginalSize(null);
      setOptimizedSize(null);
    }
    setUploading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded"
        />
      </div>
      
      <div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          rows={3}
        />
      </div>
      
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="w-full border p-2 rounded"
        />
        {optimizing && (
          <div className="text-sm text-blue-600 mt-1">Optimizing image...</div>
        )}
        {originalSize && optimizedSize && (
          <div className="text-sm text-green-600 mt-1">
            {message}
          </div>
        )}
      </div>
      
      <button
        type="submit"
        disabled={uploading || optimizing}
        className="w-full bg-blue-600 text-white rounded p-2 disabled:opacity-50"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      
      {message && !originalSize && (
        <div className="text-sm mt-2 p-2 rounded bg-gray-100">{message}</div>
      )}
    </form>
  );
}