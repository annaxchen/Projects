from dotenv import load_dotenv
import streamlit as st #front end
from PyPDF2 import PdfReader #takes text out of PDF
from langchain.text_splitter import CharacterTextSplitter
from langchain.embeddings.openai import OpenAIEmbeddings #openAI embeddings, langchain is the wrapper
from langchain.vectorstores import FAISS     #use FAISS facebook similarity search library for semantic search
        
def main():
    load_dotenv()
    st.set_page_config(page_title="Ask your PDF")
    st.header("Ask your PDF")

    pdf = st.file_uploader("Upload your pdf here", "pdf")

    if pdf is not None:
        pdf_reader = PdfReader(pdf) #lets you choose pages
        text = ""
        for page in pdf_reader.pages: #creates list of pdf pages
            text += page.extract_text()
    
    #splits text into chunks
        text_splitter = CharacterTextSplitter(
            separator = "\n", 
            chunk_size=1000, 
            chunk_overlap=200, 
            length_function=len
        )

        chunks = text_splitter.split_text(text)

        #creates embeddings
        embeddings = OpenAIEmbeddings()
        knowledge_base = FAISS.from_texts(chunks, embeddings)

        user_question = st.text_input("What questions do you have?")
        if user_question:
            docs = knowledge_base.similarity_search(user_question)

            llm = OpenAI()
            chain = load_qa_chain(llm, chain_type="stuff")
            with get_openai_callback() as cb:
                response = chain.run(input_documents=docs, question=user_question)
                print(cb)
                
            st.write(response)

if __name__ == "__main__":
    main()

