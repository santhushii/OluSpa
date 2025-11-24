export default function SkipToContent() {
  return (
    <a
      href="#top"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-olu-green focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-olu-green focus:ring-offset-2"
      onClick={(e) => {
        e.preventDefault();
        const topElement = document.getElementById("top");
        if (topElement) {
          topElement.scrollIntoView({ behavior: "smooth", block: "start" });
          topElement.focus();
        }
      }}
    >
      Skip to main content
    </a>
  );
}

