import React, { useState } from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { Upload, X, ArrowLeft, ArrowRight, Sparkles, Zap, Gem, Palette, BarChart, AlertCircle } from 'lucide-react';

const DESIGN_STYLES = [
  { label: 'Minimal & Clean', icon: <Sparkles size={18} /> },
  { label: 'Bold & Modern', icon: <Zap size={18} /> },
  { label: 'Elegant & Luxury', icon: <Gem size={18} /> },
  { label: 'Playful & Creative', icon: <Palette size={18} /> },
  { label: 'Corporate & Professional', icon: <BarChart size={18} /> },
];

export const StepDesignPreferences = ({ onNext, onBack }) => {
  const { data, updateData } = useQuestionnaire();
  const [errors, setErrors] = useState({});

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData({ logoFile: file, logoPreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    updateData({ logoFile: null, logoPreview: '' });
  };

  const updateColor = (index, val) => {
    const newColors = [...data.brandColors];
    newColors[index] = val;
    updateData({ brandColors: newColors });
  };

  const updateReference = (index, val) => {
    const newRefs = [...data.referenceWebsites];
    newRefs[index] = val;
    updateData({ referenceWebsites: newRefs });
  };

  const addReference = () => {
    updateData({ referenceWebsites: [...data.referenceWebsites, ''] });
  };

  const validate = () => {
    const e = {};
    if (!data.designStyle) e.designStyle = 'Please select a design style';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const inputClass = "w-full p-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground";

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Design Style */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Overall Design Style *</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {DESIGN_STYLES.map(({ label, icon }) => (
            <button
              key={label}
              type="button"
              onClick={() => updateData({ designStyle: label })}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all duration-200 cursor-pointer min-h-[90px] ${
                data.designStyle === label
                  ? 'bg-primary/15 border-primary text-primary'
                  : 'bg-card border-border hover:border-primary/40 text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className={data.designStyle === label ? "text-primary" : "opacity-80"}>
                {icon}
              </div>
              <span className={`text-xs font-semibold ${data.designStyle === label ? 'text-primary' : 'text-foreground'}`}>
                {label}
              </span>
            </button>
          ))}
        </div>
        {errors.designStyle && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.designStyle}</p>}
      </div>

      {/* Brand Colors */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Brand Colors</label>
        <div className="flex flex-wrap gap-4 items-center">
          {data.brandColors.map((color, idx) => (
            <div key={idx} className="flex flex-col gap-1.5 items-center">
              <div className="relative w-12 h-12 rounded-full border-2 border-border overflow-hidden cursor-pointer shadow-sm hover:border-primary/50 transition-colors">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => updateColor(idx, e.target.value)}
                  className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer"
                />
              </div>
              <span className="text-[10px] text-muted-foreground uppercase font-mono bg-background px-1.5 py-0.5 rounded border border-border">
                {color}
              </span>
            </div>
          ))}
          <div className="text-xs text-muted-foreground max-w-[200px] ml-2">
            Click the circles to pick your primary, secondary, and accent colors.
          </div>
        </div>
      </div>

      {/* Logo Upload */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Logo (Optional)</label>
        {data.logoPreview ? (
          <div className="relative inline-block border border-border p-2 rounded-xl bg-card">
            <img src={data.logoPreview} alt="Logo preview" className="h-20 max-w-[200px] object-contain rounded-lg" />
            <button
              onClick={removeLogo}
              className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-xl cursor-pointer bg-card hover:bg-card/80 hover:border-primary/50 transition-colors group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 text-muted-foreground mb-3 group-hover:text-primary transition-colors" />
              <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground group-hover:text-primary transition-colors">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
          </label>
        )}
      </div>

      {/* Reference Websites */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Reference Websites</label>
        <p className="text-xs text-muted-foreground mb-3">Share links to websites you like the look and feel of.</p>
        <div className="flex flex-col gap-2">
          {data.referenceWebsites.map((ref, idx) => (
            <input
              key={idx}
              type="url"
              value={ref}
              onChange={(e) => updateReference(idx, e.target.value)}
              placeholder="e.g. https://apple.com"
              className={inputClass}
            />
          ))}
          <button
            onClick={addReference}
            className="text-sm text-primary font-medium hover:underline text-left mt-1 w-fit cursor-pointer"
          >
            + Add another link
          </button>
        </div>
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
