import { useState, useRef, useCallback } from "react";

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState(null);

  const mediaRecorder = useRef(null);
  const audioChunks = useRef([]);
  const timerRef = useRef(null);

  const startRecording = useCallback(async () => {
    setError(null);
    setAudioBlob(null);
    setRecordingTime(0);
    audioChunks.current = [];

    try {
      // طلب صلاحية المايكروفون
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        // تجميع القطع الصوتية في ملف واحد
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        setAudioBlob(blob);

        // إيقاف عمل المايكروفون بالكامل بعد الانتهاء
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.current.start();
      setIsRecording(true);

      // تشغيل العداد
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch {
      setError("تعذر الوصول إلى المايكروفون. يرجى التأكد من الصلاحيات.");
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  }, [isRecording]);

  const clearAudio = useCallback(() => {
    setAudioBlob(null);
    setRecordingTime(0);
  }, []);

  return {
    isRecording,
    audioBlob,
    recordingTime,
    error,
    startRecording,
    stopRecording,
    clearAudio,
  };
};
