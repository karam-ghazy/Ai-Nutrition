export const validateTextQuery = (text) => {
  if (!text || text.trim().length === 0) {
    return { isValid: false, error: "الرجاء إدخال وصف للوجبة أولاً." };
  }

  if (text.trim().length < 3) {
    return {
      isValid: false,
      error: "الوصف قصير جداً، يرجى كتابة تفاصيل أكثر.",
    };
  }

  return { isValid: true, error: null };
};

export const validateAudioBlob = (blob) => {
  if (!blob) {
    return { isValid: false, error: "لا يوجد تسجيل صوتي لإرساله." };
  }

  // تحديد الحد الأقصى لحجم الملف الصوتي (مثلاً 5 ميغابايت)
  const MAX_SIZE_MB = 5;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  if (blob.size > MAX_SIZE_BYTES) {
    return {
      isValid: false,
      error: `حجم التسجيل يتجاوز الحد المسموح (${MAX_SIZE_MB}MB).`,
    };
  }

  return { isValid: true, error: null };
};
