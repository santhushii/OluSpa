import { jsPDF } from "jspdf";
import type { Feature } from "../types/content";

export function generateTreatmentsPDF(treatments: ReadonlyArray<Feature>, contactInfo: { phone: string; email: string; address: string }) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPosition = 20;

  // Helper function to add a new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - 20) {
      doc.addPage();
      yPosition = 20;
      return true;
    }
    return false;
  };

  // Header
  doc.setFillColor(46, 139, 87); // OLU green
  doc.rect(0, 0, pageWidth, 35, "F");
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  doc.text("OLU Ayurveda Beach Resort", pageWidth / 2, 15, { align: "center" });
  
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Ayurveda Treatments & Packages", pageWidth / 2, 25, { align: "center" });

  // Reset text color for content
  doc.setTextColor(47, 47, 47); // OLU ink
  
  yPosition = 45;

  // Introduction
  doc.setFontSize(11);
  doc.setFont("helvetica", "italic");
  doc.text(
    "Discover a curated range of ancient and modern wellness therapies designed to balance mind, body, and spirit.",
    14,
    yPosition,
    { maxWidth: pageWidth - 28, align: "left" }
  );
  yPosition += 12;

  // Treatments Section
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(46, 139, 87);
  doc.text("Our Treatments & Packages", 14, yPosition);
  yPosition += 10;

  treatments.forEach((treatment, index) => {
    checkPageBreak(30);

    // Treatment Title
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(47, 47, 47);
    doc.text(`${index + 1}. ${treatment.title}`, 14, yPosition);
    yPosition += 7;

    // Treatment Description
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const descriptionLines = doc.splitTextToSize(treatment.description, pageWidth - 28);
    doc.text(descriptionLines, 18, yPosition);
    yPosition += descriptionLines.length * 5 + 5;

    // Divider line
    doc.setDrawColor(201, 162, 106); // OLU gold
    doc.setLineWidth(0.2);
    doc.line(14, yPosition, pageWidth - 14, yPosition);
    yPosition += 8;
  });

  // Contact Information
  checkPageBreak(40);
  
  doc.setDrawColor(46, 139, 87);
  doc.setLineWidth(0.5);
  doc.line(14, yPosition, pageWidth - 14, yPosition);
  yPosition += 10;

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(46, 139, 87);
  doc.text("Contact Us", 14, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(47, 47, 47);
  
  doc.text(`Phone: ${contactInfo.phone}`, 14, yPosition);
  yPosition += 6;
  
  doc.text(`Email: ${contactInfo.email}`, 14, yPosition);
  yPosition += 6;
  
  const addressLines = doc.splitTextToSize(`Address: ${contactInfo.address}`, pageWidth - 28);
  doc.text(addressLines, 14, yPosition);
  yPosition += addressLines.length * 5 + 6;

  doc.text(`Hours: Daily 8:00 AM – 8:00 PM`, 14, yPosition);

  // Footer
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `© 2025 OLU Ayurveda Beach Resort - Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
  }

  // Save PDF - Mobile-friendly approach
  const fileName = `OLU_Ayurveda_Treatments_${new Date().toISOString().split("T")[0]}.pdf`;
  
  // Detect mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  
  // Use blob approach for better mobile compatibility
  const pdfBlob = doc.output('blob');
  const url = URL.createObjectURL(pdfBlob);
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.style.display = 'none';
  
  // For iOS, open in new tab as fallback (iOS doesn't support direct downloads)
  if (isIOS) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
  
  // Append to body (required for iOS and some mobile browsers)
  document.body.appendChild(link);
  
  // Trigger download
  try {
    link.click();
    
    // For iOS, also try opening in new window as fallback
    if (isIOS) {
      setTimeout(() => {
        window.open(url, '_blank');
      }, 250);
    }
  } catch (error) {
    console.error('Download failed, trying fallback:', error);
    // Fallback: open in new tab
    window.open(url, '_blank');
  }
  
  // Clean up after a delay
  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
    // Don't revoke URL immediately on mobile to allow download to complete
    if (!isMobile) {
      URL.revokeObjectURL(url);
    } else {
      // Revoke after longer delay on mobile
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }
  }, isMobile ? 1000 : 100);
}

