import { useState } from "react";
import { fetchClient } from "../../../core/api/fetchClient";

export const useNutritionApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); // سيحفظ response_text و audio_url

  const analyzeText = async (query) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const { data, error: apiError } = await fetchClient("/analyze/text", {
      method: "POST",
      body: JSON.stringify({ query }),
    });

    if (apiError) {
      setError(apiError);
    } else {
      setResult(data);
    }

    setIsLoading(false);
  };

  const analyzeVoice = async (audioBlob) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    // تجهيز الملف الصوتي كـ FormData
    const formData = new FormData();
    // الـ API يطلب الحقل باسم audio_file كما في الـ Documentation
    formData.append("audio_file", audioBlob, "recording.webm");

    const { data, error: apiError } = await fetchClient("/analyze/voice", {
      method: "POST",
      body: formData,
    });

    if (apiError) {
      setError(apiError);
    } else {
      setResult(data); // سيحتوي على transcribed_query, response_text, audio_url
    }

    setIsLoading(false);
  };

  const resetState = () => {
    setResult(null);
    setError(null);
  };

  return { isLoading, error, result, analyzeText, analyzeVoice, resetState };
};
