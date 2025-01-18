// إعداد التاريخ المستهدف (1 فبراير 2025)
const targetDate = new Date("February 1, 2025 00:00:00").getTime();

// تحديث العد التنازلي كل ثانية
const countdownInterval = setInterval(() => {
  const now = new Date().getTime();
  const timeLeft = targetDate - now;

  // حساب الأيام والساعات والدقائق والثواني
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  // عرض القيم
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  // إيقاف المؤقت إذا انتهى الوقت
  if (timeLeft < 0) {
    clearInterval(countdownInterval);
    document.querySelector(".countdown").innerHTML = "<h2>حان الموعد!</h2>";
  }
}, 1000);


 // استدعاء العناصر
 const canvas = document.getElementById('signatureCanvas');
 const signaturePad = new SignaturePad(canvas);
 const clearButton = document.getElementById('clearSignature');
 const form = document.getElementById('messageForm');

 // ضبط حجم الـ Canvas بناءً على الحاوية
 function resizeCanvas() {
   const ratio = Math.max(window.devicePixelRatio || 1, 1);
   canvas.width = canvas.offsetWidth * ratio;
   canvas.height = canvas.offsetHeight * ratio;
   canvas.getContext('2d').scale(ratio, ratio);
   signaturePad.clear(); // تنظيف التوقيع عند تغيير الحجم
 }
 window.addEventListener('resize', resizeCanvas);
 resizeCanvas();

 // مسح التوقيع
 clearButton.addEventListener('click', () => signaturePad.clear());

 // تهيئة EmailJS باستخدام الـ User ID
emailjs.init("eWtK_tXfqnP8uvlFC");

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (signaturePad.isEmpty()) {
    alert('يرجى توقيع الرسالة قبل الإرسال.');
    return;
  }

  // بيانات النموذج
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: "رسالة جديدة من موقع الزفاف", // موضوع افتراضي (يمكنك تغييره
    message: document.getElementById("message").value,
    signature: signaturePad.toDataURL(),
  };

  console.log('Data to send:', data);
  emailjs
    .send("service_75saei7", "template_s112wnq", {
      from_name: data.name,
      from_email: data.email,
      subject:data.subject,
      message: data.message,
      signature: data.signature,
    })
    .then(() => {
      alert('تم إرسال الرسالة بنجاح!');
      form.reset();
      signaturePad.clear();
    })
    .catch((error) => {
      console.error('خطأ أثناء الإرسال:', error);
      alert('حدث خطأ أثناء إرسال الرسالة.');
    });
});






