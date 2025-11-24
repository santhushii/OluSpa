export function smoothScrollTo(elementId: string, offset = 80) {
  const element = document.getElementById(elementId);
  if (!element) {
    return;
  }

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}

export function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute("href");
  if (!href || !href.startsWith("#")) {
    return;
  }

  e.preventDefault();
  const targetId = href.slice(1);
  smoothScrollTo(targetId);
}

