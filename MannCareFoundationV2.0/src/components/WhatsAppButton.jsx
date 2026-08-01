// Floating WhatsApp button (har page pe)
export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/917039006300"
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-[999] h-14 w-14 rounded-full bg-[#25D366] text-white text-3xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
    >
      <i className="fa-brands fa-whatsapp"></i>
    </a>
  );
}
