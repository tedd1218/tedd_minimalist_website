'use client';
import { useState } from 'react';
import supabase from '@/lib/supabase';

export default function ArtUploadForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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
    }
    setUploading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files?.[0] || null)}
        required
        className="border p-2 rounded"
      />
      <button
        type="submit"
        disabled={uploading}
        className="bg-blue-600 text-white rounded p-2"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <div className="text-sm mt-2">{message}</div>}
    </form>
  );
}