// =====================
// FLOATING SHAPES
// =====================
const shapesContainer = document.createElement("div");
shapesContainer.className = "floating-shapes";
document.body.appendChild(shapesContainer);

for (let i = 0; i < 6; i++) {
  const shape = document.createElement("span");
  shape.className = "shape";
  shape.style.left = Math.random() * 100 + "vw";
  shape.style.animationDelay = Math.random() * 8 + "s";
  shape.style.animationDuration = 12 + Math.random() * 10 + "s";
  shapesContainer.appendChild(shape);
}

// =====================
// NAVBAR SCROLL COLOR CHANGE
// =====================
const navbar = document.querySelector(".navbar");

const startColor = { r: 10, g: 46, b: 54 }; // #0A2E36
const endColor = { r: 0, g: 139, b: 139 };   // #008B8B (sesuai warna latar)
const alpha = 0.85; 

function interpolateColor(color1, color2, factor) {
  return {
    r: Math.round(color1.r + factor * (color2.r - color1.r)),
    g: Math.round(color1.g + factor * (color2.g - color1.g)),
    b: Math.round(color1.b + factor * (color2.b - color1.b))
  };
}

const updateNavbarBackground = () => {
  const scrollPercentage = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const clampedPercentage = Math.max(0, Math.min(1, scrollPercentage));

  const interpolatedRgb = interpolateColor(startColor, endColor, clampedPercentage);
  navbar.style.backgroundColor = `rgba(${interpolatedRgb.r}, ${interpolatedRgb.g}, ${interpolatedRgb.b}, ${alpha})`;
  navbar.style.borderBottom = `1px solid rgba(${interpolatedRgb.r}, ${interpolatedRgb.g}, ${interpolatedRgb.b}, ${alpha * 0.5})`; // Half the alpha of background
};

window.addEventListener("load", updateNavbarBackground);

window.addEventListener("scroll", updateNavbarBackground);

// =====================
// ALERT CONTACT FORM
// =====================
const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault(); 

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      alert("Pesan berhasil dikirim! Terima kasih.");
      form.reset();
    } else {
      alert("Gagal mengirim pesan");
    }
  } catch (error) {
    alert("Terjadi kesalahan. Coba lagi.");
  }
});
