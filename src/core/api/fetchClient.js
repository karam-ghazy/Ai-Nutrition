// عنوان الخادم الأساسي كما هو محدد في الـ API Documentation
const BASE_URL = "http://localhost:8000";

export const fetchClient = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        // إذا لم يكن الطلب يحتوي على FormData (مثل رفع الصوت)، نضيف Content-Type
        ...(options.body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...options.headers,
      },
    });

    // محاولة تحويل الرد إلى JSON
    const data = await response.json().catch(() => null);

    // معالجة أخطاء الـ HTTP (400, 404, 422, 500)
    if (!response.ok) {
      const errorMessage = data?.detail || `HTTP Error: ${response.status}`;
      return { data: null, error: errorMessage };
    }

    // حالة النجاح
    return { data, error: null };
  } catch {
    // معالجة أخطاء الشبكة (في حال كان الخادم لا يعمل)
    return {
      data: null,
      error: "تعذر الاتصال بالخادم. يرجى التأكد من تشغيل الـ API.",
    };
  }
};
