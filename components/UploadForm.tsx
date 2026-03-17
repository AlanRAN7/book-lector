'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UploadSimple, Image as ImageIcon, X } from '@phosphor-icons/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import LoadingOverlay from './LoadingOverlay';

const maleVoices = [
  { id: 'dave', name: 'Dave', description: 'Young male, British-Essex, casual & conversational' },
  { id: 'daniel', name: 'Daniel', description: 'Middle-aged male, British, authoritative but warm' },
  { id: 'chris', name: 'Chris', description: 'Male, casual & easy-going' },
];

const femaleVoices = [
  { id: 'rachel', name: 'Rachel', description: 'Young female, American, calm & clear' },
  { id: 'sarah', name: 'Sarah', description: 'Young female, American, soft & approachable' },
];

const formSchema = z.object({
  pdfFile: z.any().refine((file) => file instanceof File, 'PDF file is required.'),
  coverImage: z.any().optional(),
  title: z.string().min(1, 'Title is required'),
  author: z.string().min(1, 'Author name is required'),
  voice: z.string().min(1, 'Please select a voice'),
});

type FormValues = z.infer<typeof formSchema>;

const UploadForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfPreview, setPdfPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      author: '',
      voice: 'dave', // setting a default selected voice instead of an empty string
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    console.log('Submitting form values:', values);
    setTimeout(() => {
      setIsSubmitting(false);
      // form.reset();
      // setPdfPreview(null);
      // setCoverPreview(null);
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'pdf' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'pdf') {
        form.setValue('pdfFile', file);
        setPdfPreview(file.name);
      } else {
        form.setValue('coverImage', file);
        setCoverPreview(file.name);
      }
      form.trigger(type === 'pdf' ? 'pdfFile' : 'coverImage');
    }
  };

  const removeFile = (type: 'pdf' | 'cover', e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (type === 'pdf') {
      form.setValue('pdfFile', undefined);
      setPdfPreview(null);
    } else {
      form.setValue('coverImage', undefined);
      setCoverPreview(null);
    }
  };

  return (
    <>
      <LoadingOverlay isVisible={isSubmitting} />
      <div className="new-book-wrapper">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            
            {/* PDF File Dropzone */}
            <FormField
              control={form.control}
              name="pdfFile"
              render={() => (
                <FormItem>
                  <FormLabel className="form-label">Book PDF File</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleFileChange(e, 'pdf')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className={`upload-dropzone border-2 border-dashed border-[#d4c4a8] ${pdfPreview ? 'upload-dropzone-uploaded' : ''}`}>
                        {pdfPreview ? (
                          <>
                            <p className="upload-dropzone-text mb-2">{pdfPreview}</p>
                            <button
                              type="button"
                              onClick={(e) => removeFile('pdf', e)}
                              className="upload-dropzone-remove relative z-20"
                            >
                              <X size={24} weight="bold" />
                            </button>
                          </>
                        ) : (
                          <>
                            <UploadSimple className="upload-dropzone-icon" />
                            <p className="upload-dropzone-text">Click to upload PDF</p>
                            <p className="upload-dropzone-hint">PDF file (max 50MB)</p>
                          </>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Cover Image Dropzone */}
            <FormField
              control={form.control}
              name="coverImage"
              render={() => (
                <FormItem>
                  <FormLabel className="form-label">Cover Image (Optional)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, 'cover')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      <div className={`upload-dropzone border-2 border-dashed border-[#d4c4a8] ${coverPreview ? 'upload-dropzone-uploaded' : ''}`}>
                        {coverPreview ? (
                          <>
                            <p className="upload-dropzone-text mb-2">{coverPreview}</p>
                            <button
                              type="button"
                              onClick={(e) => removeFile('cover', e)}
                              className="upload-dropzone-remove relative z-20"
                            >
                              <X size={24} weight="bold" />
                            </button>
                          </>
                        ) : (
                          <>
                            <ImageIcon className="upload-dropzone-icon" />
                            <p className="upload-dropzone-text">Click to upload cover image</p>
                            <p className="upload-dropzone-hint">Leave empty to auto-generate from PDF</p>
                          </>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Title</FormLabel>
                  <FormControl>
                    <Input className="form-input" placeholder="ex: Rich Dad Poor Dad" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Author Name */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Author Name</FormLabel>
                  <FormControl>
                    <Input className="form-input" placeholder="ex: Robert Kiyosaki" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Custom Voice Selector */}
            <FormField
              control={form.control}
              name="voice"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                  <FormControl>
                    <RadioGroup
                      key="radio-group-controlled-fix"
                      onValueChange={field.onChange}
                      value={field.value || ""}
                      className="space-y-4"
                    >
                      {/* Male Voices Group */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-[#222c37]">Male Voices</p>
                        <div className="voice-selector-options flex-col md:flex-row">
                          {maleVoices.map((voice) => (
                            <div key={voice.id} className="relative flex-1">
                              <RadioGroupItem
                                value={voice.id}
                                id={voice.id}
                                className="peer sr-only"
                              />
                              <label
                                htmlFor={voice.id}
                                className={`voice-selector-option ${
                                  field.value === voice.id
                                    ? 'voice-selector-option-selected'
                                    : 'voice-selector-option-default'
                                } flex-col items-start p-4 w-full h-full`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                                    {field.value === voice.id && (
                                      <div className="w-2 h-2 rounded-full bg-[#212a3b]" />
                                    )}
                                  </div>
                                  <span className="font-semibold text-black">{voice.name}</span>
                                </div>
                                <span className="text-xs text-[#3d485e]">{voice.description}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Female Voices Group */}
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-[#222c37]">Female Voices</p>
                        <div className="voice-selector-options flex-col md:flex-row">
                          {femaleVoices.map((voice) => (
                            <div key={voice.id} className="relative flex-1">
                              <RadioGroupItem
                                value={voice.id}
                                id={voice.id}
                                className="peer sr-only"
                              />
                              <label
                                htmlFor={voice.id}
                                className={`voice-selector-option ${
                                  field.value === voice.id
                                    ? 'voice-selector-option-selected'
                                    : 'voice-selector-option-default'
                                } flex-col items-start p-4 w-full h-full`}
                              >
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center">
                                    {field.value === voice.id && (
                                      <div className="w-2 h-2 rounded-full bg-[#212a3b]" />
                                    )}
                                  </div>
                                  <span className="font-semibold text-black">{voice.name}</span>
                                </div>
                                <span className="text-xs text-[#3d485e]">{voice.description}</span>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <button type="submit" className="form-btn">
              Begin Synthesis
            </button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default UploadForm;