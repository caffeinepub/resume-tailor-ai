import type { Resume } from '../../../backend';

/**
 * Generates a professionally formatted PDF from a Resume object using client-side rendering.
 * Uses jsPDF loaded from CDN (already available in index.html).
 * @param resume - The resume data to convert to PDF
 * @returns A Blob containing the PDF data
 */
export async function generateResumePdf(resume: Resume): Promise<Blob> {
  // Access jsPDF from window (loaded via CDN in index.html)
  const { jsPDF } = (window as any).jspdf;
  
  if (!jsPDF) {
    throw new Error('jsPDF library not loaded. Please ensure the CDN script is included in index.html');
  }

  // Create new PDF document (A4, portrait)
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Page dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;
  let yPosition = margin;

  // Helper function to add text with word wrapping
  const addText = (text: string, fontSize: number, isBold: boolean = false, indent: number = 0) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    
    // Check if we need a new page
    if (yPosition + (lines.length * fontSize * 0.35) > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
    
    lines.forEach((line: string) => {
      doc.text(line, margin + indent, yPosition);
      yPosition += fontSize * 0.35;
    });
  };

  const addSpacing = (space: number) => {
    yPosition += space;
  };

  const addSeparator = () => {
    if (yPosition + 5 > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
    }
    doc.setDrawColor(220, 220, 220);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 3;
  };

  // Large prominent name header
  addText(resume.name, 28, true);
  addSpacing(8);
  addSeparator();
  addSpacing(5);

  // Languages section (first)
  if (resume.languages.length > 0) {
    addText('🌐 Languages', 13, true);
    addSpacing(4);
    resume.languages.forEach((language) => {
      addText(`• ${language}`, 10, false, 3);
      addSpacing(1.5);
    });
    addSpacing(5);
  }

  // Work Experience section
  if (resume.workExperience.length > 0) {
    addText('💼 Work Experience', 13, true);
    addSpacing(4);
    resume.workExperience.forEach((experience) => {
      addText(`• ${experience}`, 10, false, 3);
      addSpacing(2);
    });
    addSpacing(5);
  }

  // Education section
  if (resume.education.length > 0) {
    addText('🎓 Education', 13, true);
    addSpacing(4);
    resume.education.forEach((edu) => {
      addText(`• ${edu}`, 10, false, 3);
      addSpacing(2);
    });
    addSpacing(5);
  }

  // Projects section (if any work experience items look like projects)
  // Note: Currently using work experience as projects placeholder
  // This matches the screenshot structure

  // Skills section
  if (resume.skills.length > 0) {
    addText('🔧 Skills', 13, true);
    addSpacing(4);
    resume.skills.forEach((skill) => {
      addText(`• ${skill}`, 10, false, 3);
      addSpacing(1.5);
    });
    addSpacing(5);
  }

  // Additional Information (Certificates)
  if (resume.certificates.length > 0) {
    addText('📋 Additional Information', 13, true);
    addSpacing(4);
    resume.certificates.forEach((cert) => {
      addText(`• ${cert}`, 10, false, 3);
      addSpacing(2);
    });
    addSpacing(5);
  }

  // Career & Objectives (Summary + Position)
  if (resume.summary || resume.position) {
    addText('🎯 Career & Objectives', 13, true);
    addSpacing(4);
    if (resume.position) {
      addText(`Position: ${resume.position}`, 10, true, 3);
      addSpacing(2);
    }
    if (resume.summary) {
      addText(resume.summary, 10, false, 3);
      addSpacing(2);
    }
  }

  // Convert to Blob
  const pdfBlob = doc.output('blob');
  return pdfBlob;
}
