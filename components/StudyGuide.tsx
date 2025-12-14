import React from 'react';
import { Topic } from '../types';
import { ChevronRight, CheckCircle2, HelpCircle } from 'lucide-react';

interface StudyGuideProps {
  topic: Topic;
}

const StudyGuide: React.FC<StudyGuideProps> = ({ topic }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className={`p-6 rounded-2xl ${topic.color} bg-opacity-50 border border-opacity-20 border-current shadow-sm`}>
        <div className="flex items-center gap-4">
          <span className="text-4xl">{topic.icon}</span>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{topic.title}</h2>
            <p className="opacity-80 mt-1">Must-know essentials for the interview</p>
          </div>
        </div>
      </div>

      {/* Must Know Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {topic.mustKnow.map((section, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 border-b pb-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              {section.title}
            </h3>
            <ul className="space-y-3">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-600 leading-relaxed">
                  <ChevronRight className="w-4 h-4 mt-1 flex-shrink-0 text-gray-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Common Questions */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-800">
          <HelpCircle className="w-6 h-6 text-purple-500" />
          Questions Types à Préparer
        </h3>
        <div className="grid gap-4">
          {topic.questions.map((q, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-gray-700 font-medium">
              "{q}"
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudyGuide;