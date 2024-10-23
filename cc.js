// الحصول على العناصر من DOM
const colorInput = document.querySelector('.color-input');
const overlayCanvas = document.querySelector('.img-2');
const ctx = overlayCanvas.getContext('2d');

// تحميل الصورة المفرغة
const overlayImage = new Image();
overlayImage.src = './وهي الطبقة يلي بدك تغير لونا (1).png'; // ضع هنا مسار الصورة المفرغة

// عند تحميل الصورة، نقوم برسمها على الـ canvas
overlayImage.onload = () => {
    ctx.drawImage(overlayImage, 0, 0, overlayCanvas.width, overlayCanvas.height);
};

// إضافة مستمع للحدث عند تغيير لون المدخل
colorInput.addEventListener('input', () => {
    const selectedColor = colorInput.value; // الحصول على اللون المختار
    changeOverlayColor(selectedColor);
});

// دالة لتغيير لون الصورة المفرغة
function changeOverlayColor(color) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // الحصول على بيانات الصورة من الـ canvas
    const imageData = ctx.getImageData(0, 0, overlayCanvas.width, overlayCanvas.height);
    const data = imageData.data;

    // تعديل اللون للبيكسلات
    for (let i = 0; i < data.length; i += 4) {
        // إذا كانت البيكسل ليست شفافة، نغير لونها
        if (data[i + 3] !== 0) { // التحقق من الشفافية
            data[i] = r;     // تغيير قيمة الأحمر
            data[i + 1] = g; // تغيير قيمة الأخضر
            data[i + 2] = b; // تغيير قيمة الأزرق
        }
    }

    // وضع البيانات المعدلة في الـ canvas
    ctx.putImageData(imageData, 0, 0);
}
//  انتهى القسم الأول 

 






// تحميل صورة المستخدم
const logoUploader = document.getElementById("logoUploader");
const userLogo = document.getElementById("userLogo");
const uploadLogoBtn = document.getElementById("uploadLogoBtn");

// عند النقر على زر رفع الشعار
uploadLogoBtn.addEventListener("click", () => {
  logoUploader.click(); // فتح نافذة اختيار الملف
});

// عند اختيار صورة جديدة
logoUploader.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      userLogo.src = e.target.result; // تحديث الصورة الجديدة
      userLogo.style.display = "block"; // جعل الصورة مرئية
      userLogo.style.minWidth = "20px"; // تعيين العرض الابتدائي
      userLogo.style.minHeight = "20px"; // تعيين الارتفاع الابتدائي
      userLogo.style.top = "45%";
      userLogo.style.left = "52%";
      enableDragResize(userLogo); // تمكين سحب وتغيير حجم الصورة
    };
    reader.readAsDataURL(file); // قراءة الصورة كـ Data URL
  }
});

// تمكين سحب وتغيير حجم الصورة
function enableDragResize(element) {
  let isDragging = false;
  let startX, startY, startWidth, startHeight;

  element.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(element).width,
      10
    );
    startHeight = parseInt(
      document.defaultView.getComputedStyle(element).height,
      10
    );
    element.style.cursor = "grabbing"; // تغيير شكل المؤشر
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      const newWidth = startWidth + (e.clientX - startX);
      const newHeight = startHeight + (e.clientY - startY);

      // تحديد الحدود القصوى والحدود الدنيا
      if (newWidth > 10 && newWidth <= 100) {
        element.style.width = newWidth + "px";
      }
      if (newHeight > 10 && newHeight <= 100) {
        element.style.height = newHeight + "px";
      }
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    element.style.cursor = "nwse-resize"; // استعادة شكل المؤشر
  });
}























// الحصول على القائمة المنسدلة والصور
const colorDropdown = document.getElementById('color-dropdown');
const images = document.querySelectorAll('.color-image');

// إضافة حدث تغيير عند اختيار لون من القائمة المنسدلة
colorDropdown.addEventListener('change', function() {
    const selectedColor = this.value;

    // إزالة التحديد من جميع الصور
    images.forEach(img => img.classList.remove('selected'));

    // تحديد الصورة المطابقة للون المختار
    document.querySelector(`.color-image[data-color="${selectedColor}"]`).classList.add('selected');
});

