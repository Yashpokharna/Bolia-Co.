import React, { useState, useEffect } from 'react';

interface CAFirmLoadingScreenProps {
  logo?: string;
  firmName?: string;
  tagline?: string;
  onLoadingComplete?: () => void;
  duration?: number; // Duration in milliseconds
}

const CAFirmLoadingScreen: React.FC<CAFirmLoadingScreenProps> = ({ 
  logo,
  firmName = "Premium CA Services",
  tagline = "Professional Accounting Solutions",
  onLoadingComplete,
  duration = 3000 // 3 seconds default
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const texts = ['Initializing', 'Loading Resources', 'Setting up Dashboard', 'Almost Ready'];
    let textIndex = 0;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (duration / 50); // Calculate increment based on duration
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, 50);

    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length;
      setLoadingText(texts[textIndex]);
    }, duration / 4); // Change text 4 times during loading

    // Hide loading screen after duration
    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
      if (onLoadingComplete) {
        onLoadingComplete();
      }
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      clearTimeout(hideTimeout);
    };
  }, [duration, onLoadingComplete]);

  const spinnerStyle = {
    animation: 'spin 1.2s linear infinite'
  };

  const fadeInUpStyle = {
    animation: 'fadeInUp 0.8s ease-out forwards'
  };

  const bounceStyles = [
    { animation: 'bounce 1s infinite' },
    { animation: 'bounce 1s infinite', animationDelay: '0.1s' },
    { animation: 'bounce 1s infinite', animationDelay: '0.2s' }
  ];

  if (!isVisible) return null;

  return (
    <>
      <style jsx>{`
        @keyframes spin {
          0% { opacity: 1; }
          100% { opacity: 0.15; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -6px, 0);
          }
          70% {
            animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);
            transform: translate3d(0, -3px, 0);
          }
          90% {
            transform: translate3d(0,-1px,0);
          }
        }

        .pulse {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
      
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <div className="text-center">
          {/* Logo Section */}
          <div className="mb-8" style={fadeInUpStyle}>
            <div className="flex items-center justify-center w-40 h-40 mx-auto mb-6 overflow-hidden transition-transform duration-300 bg-white border border-gray-100 shadow-2xl rounded-2xl hover:scale-105 pulse">
              {logo ? (
                <img 
                  src={logo} 
                  alt="Company Logo" 
                  className="object-contain w-36 h-36"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<span class="text-gray-800 text-4xl font-bold tracking-wider">CA</span>';
                    }
                  }}
                />
              ) : (
                <span className="text-4xl font-bold tracking-wider text-gray-800">CA</span>
              )}
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-800">
              {firmName}
            </h1>
            <p className="text-lg text-gray-600">
              {tagline}
            </p>
          </div>

          {/* Loading Animation */}
          <div className="mb-8">
            <div className="relative w-16 h-16 mx-auto mb-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gray-700 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 45}deg) translate(0, -150%)`,
                    transformOrigin: '0 150%',
                    animation: `spin 1.2s linear infinite`,
                    animationDelay: `${-i * 0.15}s`,
                  }}
                />
              ))}
            </div>
            <div className="mb-4 text-xl font-medium text-gray-800">
              {loadingText}
              <span className="inline-flex ml-1">
                {bounceStyles.map((style, index) => (
                  <span key={index} style={style}>.</span>
                ))}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mx-auto mb-6 w-80">
            <div className="h-2 bg-gray-200 rounded-full shadow-inner">
              <div 
                className="h-2 transition-all duration-300 ease-out rounded-full shadow-md bg-gradient-to-r from-gray-700 to-gray-600"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 text-sm font-medium text-gray-500">
              {Math.round(progress)}% Complete
            </div>
          </div>

          {/* Features List */}
          <div className="grid max-w-md grid-cols-2 gap-4 mx-auto text-sm text-gray-600">
            <div className="flex items-center">
              <div className="w-2 h-2 mr-2 bg-gray-700 rounded-full pulse"></div>
              Tax Planning
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 mr-2 bg-gray-700 rounded-full pulse" style={{animationDelay: '0.2s'}}></div>
              Audit Services
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 mr-2 bg-gray-700 rounded-full pulse" style={{animationDelay: '0.4s'}}></div>
              GST Compliance
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 mr-2 bg-gray-700 rounded-full pulse" style={{animationDelay: '0.6s'}}></div>
              Financial Advisory
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CAFirmLoadingScreen;