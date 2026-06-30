import React, { useState } from 'react';
import { useQuestionnaire } from '@/context/QuestionnaireContext';
import { AlertCircle, ArrowRight } from 'lucide-react';

const GOAL_OPTIONS = [
  'Generate leads',
  'Sell products/services',
  'Build brand awareness',
  'Showcase portfolio',
];

export const StepBusinessBasics = ({ onNext }) => {
  const { data, updateData } = useQuestionnaire();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!data.businessName.trim()) e.businessName = 'Business name is required';
    if (!data.industry.trim()) e.industry = 'Industry is required';
    if (!data.businessDescription.trim()) e.businessDescription = 'Please describe your business';
    if (!data.targetAudience.trim()) e.targetAudience = 'Target audience is required';
    if (data.websiteGoals.length === 0) e.websiteGoals = 'Select at least one goal';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const toggleGoal = (goal) => {
    const current = data.websiteGoals;
    updateData({
      websiteGoals: current.includes(goal)
        ? current.filter((g) => g !== goal)
        : [...current, goal],
    });
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  const inputClass = "w-full p-3 bg-background border border-border rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground";

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Business Name *</label>
        <input
          type="text"
          value={data.businessName}
          onChange={(e) => updateData({ businessName: e.target.value })}
          className={inputClass}
          placeholder="e.g. Smith Dental Care"
        />
        {errors.businessName && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.businessName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Industry / Niche *</label>
        <input
          type="text"
          value={data.industry}
          onChange={(e) => updateData({ industry: e.target.value })}
          className={inputClass}
          placeholder="e.g. Dentistry, Real Estate, Law Firm"
        />
        {errors.industry && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.industry}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Business Description *</label>
        <textarea
          rows={3}
          value={data.businessDescription}
          onChange={(e) => updateData({ businessDescription: e.target.value })}
          className={inputClass + " resize-none"}
          placeholder="Tell us about your business in a few sentences"
        />
        {errors.businessDescription && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.businessDescription}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">Target Audience *</label>
        <input
          type="text"
          value={data.targetAudience}
          onChange={(e) => updateData({ targetAudience: e.target.value })}
          className={inputClass}
          placeholder="e.g. Homeowners aged 30–55 in the Austin, TX area"
        />
        {errors.targetAudience && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.targetAudience}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-3">Website Goals *</label>
        <div className="flex flex-wrap gap-3">
          {GOAL_OPTIONS.map((goal) => (
            <button
              key={goal}
              type="button"
              onClick={() => toggleGoal(goal)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer ${
                data.websiteGoals.includes(goal)
                  ? 'bg-primary/20 border-primary text-primary'
                  : 'bg-transparent border-border text-muted-foreground hover:border-primary/50'
              }`}
            >
              {goal}
            </button>
          ))}
          <button
            type="button"
            onClick={() => toggleGoal('Other')}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 cursor-pointer ${
              data.websiteGoals.includes('Other')
                ? 'bg-primary/20 border-primary text-primary'
                : 'bg-transparent border-border text-muted-foreground hover:border-primary/50'
            }`}
          >
            Other
          </button>
        </div>
        {data.websiteGoals.includes('Other') && (
          <input
            type="text"
            value={data.websiteGoalOther}
            onChange={(e) => updateData({ websiteGoalOther: e.target.value })}
            className={inputClass + " mt-3"}
            placeholder="Please specify"
          />
        )}
        {errors.websiteGoals && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} />{errors.websiteGoals}</p>}
      </div>

      <div className="flex justify-end mt-4">
        <button onClick={handleNext} className="cosmic-button px-8 py-3 rounded-lg text-sm font-semibold flex items-center gap-2">
          Next <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
