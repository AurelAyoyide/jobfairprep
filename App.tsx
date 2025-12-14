import React, { useState } from 'react';
import { TOPICS } from './constants';
import { AppMode, Topic } from './types';
import StudyGuide from './components/StudyGuide';
import MockInterview from './components/MockInterview';
import { BookOpen, MessagesSquare, Menu, X, Rocket, GraduationCap } from 'lucide-react';

const App: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState<Topic>(TOPICS[0]);
  const [mode, setMode] = useState<AppMode>(AppMode.STUDY);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b p-4 flex justify-between items-center sticky top-0 z-20">
        <span className="font-bold text-lg flex items-center gap-2">
           <Rocket className="w-5 h-5 text-blue-600" /> JobFair Prep
        </span>
        <button onClick={toggleSidebar} className="p-2 text-gray-600">
          {sidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-10 w-72 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 h-full flex flex-col">
          <div className="hidden md:flex items-center gap-2 mb-8 text-2xl font-bold text-gray-800">
            <Rocket className="w-8 h-8 text-blue-600" />
            <span>JobFair Prep</span>
          </div>

          <div className="space-y-6 flex-1 overflow-y-auto">
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Technologies
              </h3>
              <nav className="space-y-1">
                {TOPICS.map(topic => (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setActiveTopic(topic);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                      activeTopic.id === topic.id 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <span className="text-lg">{topic.icon}</span>
                    {topic.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-gray-100">
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm font-medium text-blue-900 mb-1">Dimanche Soir ?</p>
              <p className="text-xs text-blue-700">Pas de panique. Révise les essentiels, teste-toi, et dors bien. Tu vas gérer mardi ! 🚀</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-65px)] md:h-screen">
        <div className="max-w-5xl mx-auto px-4 py-8 md:p-12">
          
          {/* Mode Switcher */}
          <div className="flex justify-center mb-8">
            <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 inline-flex">
              <button
                onClick={() => setMode(AppMode.STUDY)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  mode === AppMode.STUDY 
                    ? 'bg-gray-900 text-white shadow-md' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Fiches de Révision
              </button>
              <button
                onClick={() => setMode(AppMode.INTERVIEW)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  mode === AppMode.INTERVIEW 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <MessagesSquare className="w-4 h-4" />
                Simulateur IA
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="min-h-[500px]">
            {mode === AppMode.STUDY ? (
              <StudyGuide topic={activeTopic} />
            ) : (
              <MockInterview topic={activeTopic} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;