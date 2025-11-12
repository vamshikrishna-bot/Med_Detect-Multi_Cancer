import { useState } from 'react';
import { Upload, Loader2, AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface DetectionResult {
  cancerType: string;
  confidence: number;
  description: string;
  recommendations: string[];
}

interface CancerDetectorProps {
  isDarkMode?: boolean;
}

export function CancerDetector({ isDarkMode = false }: CancerDetectorProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
        setError(null);
        setShowResult(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setShowResult(false);

    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/detect-cancer`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageData: selectedImage,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed. Please try again.');
      }

      const data = await response.json();
      setResult(data);
      setShowResult(true);

      await supabase.from('cancer_detections').insert({
        image_url: 'base64_image',
        detected_cancer_type: data.cancerType,
        confidence_score: data.confidence,
        additional_info: {
          description: data.description,
          recommendations: data.recommendations,
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis');
      setShowResult(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-slide-up pt-20 pb-20">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-8 h-8 animate-bounce-subtle" />
              <h1 className="text-3xl font-bold">Multi-Cancer Detection System</h1>
            </div>
            <p className="text-blue-100">Upload a medical image for AI-powered cancer type identification</p>
          </div>
        </div>

        <div className="p-8">
          <div className="mb-8">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all hover:border-blue-400 hover:shadow-md group"
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Selected medical scan"
                  className="h-full w-full object-contain p-4 animate-scale-in"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-4 group-hover:text-blue-500 transition-colors animate-bounce-subtle" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">Medical images (PNG, JPG, JPEG)</p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageSelect}
              />
            </label>
          </div>

          {selectedImage && (
            <button
              onClick={analyzeImage}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2 animate-slide-up group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="relative z-10 flex items-center gap-2">
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin-slow" />
                    Analyzing Image...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Detect Cancer Type
                  </>
                )}
              </div>
            </button>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-slide-down animate-shake">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5 animate-bounce-subtle" />
              <div>
                <p className="text-red-800 font-semibold">Error</p>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          {showResult && result && (
            <div className="mt-6 space-y-4">
              <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl animate-slide-up stagger-1">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5 animate-bounce-subtle" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-green-900 mb-1">Detection Complete</h3>
                    <p className="text-green-700 text-sm">Analysis has been processed successfully</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="animate-slide-in-left stagger-2">
                    <p className="text-sm text-green-700 mb-1">Detected Cancer Type:</p>
                    <p className="text-2xl font-bold text-green-900">{result.cancerType}</p>
                  </div>

                  <div className="animate-slide-in-right stagger-3">
                    <p className="text-sm text-green-700 mb-1">Confidence Score:</p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-green-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-green-500 to-green-600 h-full transition-all duration-1000"
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                      <span className="text-lg font-bold text-green-900">{result.confidence}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl animate-slide-up stagger-2 hover:shadow-lg transition-shadow">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                  Description:
                </h4>
                <p className="text-blue-800 text-sm leading-relaxed">{result.description}</p>
              </div>

              {result.recommendations.length > 0 && (
                <div className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl animate-slide-up stagger-3 hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-600 rounded-full animate-pulse"></span>
                    Recommendations:
                  </h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-amber-800 text-sm animate-slide-in-left"
                        style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                      >
                        <span className="text-amber-600 mt-1 font-bold">→</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl animate-slide-up stagger-4">
                <p className="text-xs text-gray-600 text-center">
                  <strong>Medical Disclaimer:</strong> This is an AI-powered detection tool for educational purposes.
                  Always consult qualified healthcare professionals for proper diagnosis and treatment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
