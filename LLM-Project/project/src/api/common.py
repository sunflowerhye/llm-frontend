import os
import pandas as pd
from rapidfuzz import process, fuzz
import openai
from dotenv import load_dotenv
import zipfile

# .env 파일 로드
load_dotenv(dotenv_path="..\.env")
# ZIP 파일 경로와 추출 디렉토리 설정
zip_file_path = r'C:\\SW-Onpremises-LLM-Web-Front\\llm-frontend\\LLM-Project\\project\\dataSet4.zip'
extract_dir = r'C:\\SW-Onpremises-LLM-Web-Front\\llm-frontend\\LLM-Project\\project\\extracted_files'

# 추출 디렉토리 확인 및 생성
if not os.path.exists(extract_dir):
    os.makedirs(extract_dir)

# ZIP 파일 추출
if not os.path.exists(os.path.join(extract_dir, 'dataSet4.json')):  # JSON 파일이 없으면 추출
    with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
        zip_ref.extractall(extract_dir)
    print("ZIP 파일에서 데이터셋이 추출되었습니다.")

# JSON 파일 경로 설정
DATA_PATH = os.path.join(extract_dir, 'dataSet4.json')
data = pd.read_json(DATA_PATH)

# OpenAI API 키 설정
openai.api_key = os.getenv("OPENAI_API_KEY")

# 공통 함수: Fuzzy Matching
def find_best_match(input_text, column):
    input_text = ''.join(input_text.split()).lower()
    choices = data[column].dropna().unique()
    result = process.extractOne(input_text, choices, scorer=fuzz.ratio)
    if result is None:
        return None, 0
    return result[0], round(result[1], 1)

# 공통 함수: OpenAI API 호출
def call_openai_api(messages, model="gpt-3.5-turbo", max_tokens=1200):
    try:
        response = openai.ChatCompletion.create(
            model=model,
            messages=messages,
            max_tokens=max_tokens
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"OpenAI API 호출 오류: {e}")
        return "오류로 인해 데이터를 처리할 수 없습니다."
