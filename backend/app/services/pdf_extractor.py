import fitz


def extract_text_from_pdf(file_path: str) -> str:
    """
    Extract text from all pages of a PDF file.
    """

    document = fitz.open(file_path)

    extracted_text = []

    try:
        for page in document:
            text = page.get_text()

            if text:
                extracted_text.append(text)
    finally:
        document.close()

    return "\n".join(extracted_text).strip()