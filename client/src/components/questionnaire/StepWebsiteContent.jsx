import React, { useState } from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { AlertCircle, Plus, Minus, Upload, FileText, Sparkles, ArrowLeft, ArrowRight, X } from 'lucide-react';

export const StepWebsiteContent = ({ onNext, onBack }) => {
  const { data, updateData } = useQuestionnaire();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!data.numberOfPages || data.numberOfPages < 1) e.numberOfPages = 'At least 1 page is required';
    if (data.pageNames.length === 0 || data.pageNames.every((p) => !p.trim())) e.pageNames = 'Add at least one page name';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const addPage = () => {
    updateData({ pageNames: [...data.pageNames, ''] });
  };

  const removePage = (index) => {
    const updated = data.pageNames.filter((_, i) => i !== index);
    updateData({ pageNames: updated });
  };

  const updatePageName = (index, value) => {
    const updated = [...data.pageNames];
    updated[index] = value;
    updateData({ pageNames: updated });
  };

  const handleContentUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      updateData({ contentFile: file });
    }
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const inputClass = "w-full p-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground";

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Number of Pages */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Number of Pages *</label>
        <input
          type="number"
          min={1}
          value={data.numberOfPages}
          onChange={(e) => updateData({ numberOfPages: parseInt(e.target.value) || 1 })}
          className={inputClass + " max-w-[120px]"}
        />
        {errors.numberOfPages && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.numberOfPages}</p>}
      </div>

      {/* Pages */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">What pages do you need?</label>
        <div className="flex flex-col gap-3">
          {data.pageNames.map((pageName, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={pageName}
                onChange={(e) => updatePageName(index, e.target.value)}
                placeholder={`Page ${index + 1} Name`}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removePage(index)}
                disabled={data.pageNames.length <= 1}
                className="w-12 h-12 flex-shrink-0 bg-card border border-border rounded-lg flex items-center justify-center text-muted-foreground hover:text-red-500 hover:border-red-500/50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>
          ))}
          {data.pageNames.length < 10 && (
            <button
              type="button"
              onClick={addPage}
              className="w-full p-3 border border-dashed border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Add another page
            </button>
          )}
        </div>
        {errors.pageNames && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.pageNames}</p>}
      </div>

      <hr className="border-border" />

      {/* Existing Content */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Do you have existing content? (Text, images, videos)</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => updateData({ hasExistingContent: true })}
            className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer ${
              data.hasExistingContent ? 'bg-primary/20 border-primary text-primary' : 'bg-transparent border-border text-muted-foreground'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => updateData({ hasExistingContent: false, contentFile: null })}
            className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer ${
              !data.hasExistingContent ? 'bg-primary/20 border-primary text-primary' : 'bg-transparent border-border text-muted-foreground'
            }`}
          >
            No
          </button>
        </div>
        
        <div className="mt-4">
          {data.hasExistingContent ? (
            <label className="flex items-center gap-3 p-4 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
              {data.contentFile ? (
                <>
                  <FileText size={20} className="text-primary" />
                  <span className="text-sm text-foreground">{data.contentFile.name}</span>
                </>
              ) : (
                <>
                  <Upload size={20} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Upload content (.pdf, .doc, .docx, .txt)</span>
                </>
              )}
              <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleContentUpload} className="hidden" />
            </label>
          ) : (
            <p className="text-sm text-muted-foreground bg-primary/5 border border-primary/20 rounded-lg p-3 flex items-center gap-2">
              <Sparkles size={16} className="text-primary" /> No worries — we will help you create content for your website.
            </p>
          )}
        </div>
      </div>

      {/* Blog */}
      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
        <div>
          <p className="text-sm font-medium text-foreground">Do you need a blog?</p>
          <p className="text-xs text-muted-foreground">Publish articles and updates on your website</p>
        </div>
        <button
          type="button"
          onClick={() => updateData({ needsBlog: !data.needsBlog })}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer ${data.needsBlog ? 'bg-primary' : 'bg-border'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${data.needsBlog ? 'translate-x-6' : ''}`} />
        </button>
      </div>

      {/* E-commerce */}
      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
        <div>
          <p className="text-sm font-medium text-foreground">Do you need an online store?</p>
          <p className="text-xs text-muted-foreground">Sell products or services directly on your site</p>
        </div>
        <button
          type="button"
          onClick={() => updateData({ needsEcommerce: !data.needsEcommerce })}
          className={`relative w-12 h-6 rounded-full transition-colors duration-200 cursor-pointer ${data.needsEcommerce ? 'bg-primary' : 'bg-border'}`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-200 ${data.needsEcommerce ? 'translate-x-6' : ''}`} />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button onClick={onBack} className="px-8 py-3 rounded-lg text-sm font-semibold border border-border text-foreground hover:border-primary transition-colors cursor-pointer flex items-center gap-2">
          <ArrowLeft size={16} /> Back
        </button>
        <button onClick={handleNext} className="cosmic-button px-8 py-3 rounded-lg text-sm font-semibold flex items-center gap-2">
          Next <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
