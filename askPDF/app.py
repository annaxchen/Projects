from PyPDF2 import PdfReader

def main():
    with open('demo.pdf', 'rb') as file:
        pdf_reader = PdfReader(file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        print(text)
    
if __name__ == '__main__':
    main()

