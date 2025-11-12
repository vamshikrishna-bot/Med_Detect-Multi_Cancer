import { ArrowRight, Zap, Shield, Users, TrendingUp, CheckCircle2 } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'AI-powered cancer detection in seconds with advanced algorithms',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your medical data is encrypted and protected with enterprise security',
    },
    {
      icon: Users,
      title: 'Expert Recommended',
      description: 'Trusted by healthcare professionals and medical institutions worldwide',
    },
    {
      icon: TrendingUp,
      title: 'High Accuracy',
      description: 'Continuously improved detection models with 95%+ accuracy rates',
    },
  ];

  const cancerTypes = [
    'Lung Cancer',
    'Breast Cancer',
    'Brain Tumor',
    'Skin Cancer',
    'Colorectal Cancer',
    'Prostate Cancer',
    'Leukemia',
    'Lymphoma',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="py-20 animate-slide-up">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                  Advanced Cancer
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                  Detection System
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Harness the power of artificial intelligence to identify cancer types from medical images with unprecedented accuracy and speed.
              </p>

              <div className="flex flex-wrap gap-3">
                {cancerTypes.map((type, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 rounded-full bg-white border border-blue-200 text-sm text-gray-700 hover:bg-blue-50 transition-colors animate-scale-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {type}
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate('detector')}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                <span className="relative z-10">Start Detection</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="relative animate-slide-in-right">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl blur-3xl opacity-20 animate-float"></div>
              <div className="relative bg-white p-8 rounded-3xl shadow-2xl">
                <div className="space-y-6">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl animate-pulse"></div>
                      <p className="text-gray-500 text-sm">Medical Image Scan</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 font-medium">Image uploaded successfully</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-green-400 to-green-600 h-full w-0 animate-progress-fill" style={{ animationDuration: '2s', animation: 'progress-fill 2s ease-out infinite' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Why Choose MedDetect?</h2>
            <p className="text-xl text-gray-600">Industry-leading features for accurate cancer detection</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-blue-300 hover:shadow-xl transition-all hover:-translate-y-1 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl px-8 md:px-16 text-white text-center animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Upload your medical image and let our AI-powered system provide accurate cancer detection results within seconds.
          </p>
          <button
            onClick={() => onNavigate('detector')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 group"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </section>
      </div>
    </div>
  );
}
