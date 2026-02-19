/**
 * Extract text from a PDF file using PDF.js library.
 * This function runs entirely in the browser and does not require backend support.
 * 
 * @param arrayBuffer - The PDF file as an ArrayBuffer
 * @returns A promise that resolves to the extracted text as a single string
 * @throws Error if PDF.js is not loaded, the PDF cannot be read, or extraction fails
 */
export async function extractPdfText(arrayBuffer: ArrayBuffer): Promise<string> {
  // Check if PDF.js is loaded
  if (typeof window === 'undefined' || !(window as any).pdfjsLib) {
    throw new Error('PDF.js library is not loaded. Please refresh the page and try again.');
  }

  const pdfjsLib = (window as any).pdfjsLib;

  try {
    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    const numPages = pdf.numPages;
    const textParts: string[] = [];

    // Extract text from each page
    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Preserve line structure by respecting text item positions
        const pageLines: string[] = [];
        let currentLine = '';
        let lastY = -1;
        
        for (const item of textContent.items) {
          const textItem = item as any;
          const itemY = textItem.transform[5]; // Y position
          
          // If Y position changed significantly, start a new line
          if (lastY !== -1 && Math.abs(itemY - lastY) > 5) {
            if (currentLine.trim()) {
              pageLines.push(currentLine.trim());
            }
            currentLine = textItem.str;
          } else {
            // Same line, add space if needed
            if (currentLine && !currentLine.endsWith(' ') && !textItem.str.startsWith(' ')) {
              currentLine += ' ';
            }
            currentLine += textItem.str;
          }
          
          lastY = itemY;
        }
        
        // Add the last line
        if (currentLine.trim()) {
          pageLines.push(currentLine.trim());
        }
        
        const pageText = pageLines.join('\n');
        
        if (pageText.trim()) {
          textParts.push(pageText.trim());
        }
      } catch (pageError) {
        console.error(`Error extracting text from page ${pageNum}:`, pageError);
        // Continue with other pages even if one fails
      }
    }

    // Combine all pages with line breaks
    const fullText = textParts.join('\n\n');

    if (!fullText.trim()) {
      throw new Error('No text could be extracted from the PDF. The file may be empty, image-based, or encrypted.');
    }

    return fullText;
  } catch (error) {
    if (error instanceof Error) {
      // Re-throw our custom errors
      if (error.message.includes('No text could be extracted') || 
          error.message.includes('PDF.js library is not loaded')) {
        throw error;
      }
      // Wrap other errors with a user-friendly message
      throw new Error(`Failed to read PDF file: ${error.message}`);
    }
    throw new Error('An unexpected error occurred while extracting text from the PDF.');
  }
}
