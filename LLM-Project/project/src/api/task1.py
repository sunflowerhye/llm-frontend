from flask import Blueprint, request, jsonify
from common import call_openai_api, data

task1 = Blueprint('task1', __name__)

@task1.route('/generate-promo-emotional', methods=['POST'])
def generate_promo_emotional():
    try:
        input_data = request.json
        company_name = input_data.get('companyName', '')
        product_name = input_data.get('productName', '')
        product_info = input_data.get('productInfo', '')
        keywords = input_data.get('keywords', '')
        target_audience = input_data.get('targetAudience', '')
        file_content = input_data.get('fileContent', '')  # 파일 내용 처리

        if file_content:
            # 파일 내용이 있으면, 파일 내용으로 product_info를 대체하거나 필요한 데이터로 처리
            product_info = file_content  # 파일 내용을 제품 설명에 사용

        messages = [
            {"role": "system", "content": "당신은 감성적인 홍보 문구를 작성하는 마케팅 전문가입니다."},
            {"role": "user", "content": (
                f"다음은 제품 정보입니다:\n"
                f"- 회사명: {company_name}\n"
                f"- 제품명: {product_name}\n"
                f"- 제품 설명: {product_info}\n"
                f"- 홍보 키워드: {keywords}\n"
                f"- 타겟 대상: {target_audience}\n\n"
                f"제품의 느낌과 감동을 전하는 감성적인 홍보 문구를 한국어로 자연스럽게 작성해주세요."
                f"생성된 홍보문구만 출력해주세요."
            )}
        ]
        promo_text = call_openai_api(messages)
        return jsonify({'promoText': promo_text})
    except Exception as e:
        print(f"Error in /generate-promo-emotional endpoint: {e}")
        return jsonify({'error': f"서버 오류 발생: {e}"}), 500


# 효과 강조 홍보 문구 생성
@task1.route('/generate-promo-effect', methods=['POST'])
def generate_promo_effect():
    try:
        input_data = request.json
        company_name = input_data.get('companyName', '')
        product_name = input_data.get('productName', '')
        product_info = input_data.get('productInfo', '')
        keywords = input_data.get('keywords', '')
        target_audience = input_data.get('targetAudience', '')
        file_content = input_data.get('fileContent', '')  # 파일 내용 처리

        if file_content:
            # 파일 내용이 있으면, 파일 내용으로 product_info를 대체하거나 필요한 데이터로 처리
            product_info = file_content  # 파일 내용을 제품 설명에 사용

        messages = [
            {"role": "system", "content": "당신은 제품의 효과를 강조한 홍보 문구를 작성하는 마케팅 전문가입니다."},
            {"role": "user", "content": (
                f"다음은 제품 정보입니다:\n"
                f"- 회사명: {company_name}\n"
                f"- 제품명: {product_name}\n"
                f"- 제품 설명: {product_info}\n"
                f"- 홍보 키워드: {keywords}\n"
                f"- 타겟 대상: {target_audience}\n\n"
                f"제품의 주요 효과와 뛰어난 특징을 강조하는 홍보 문구를 한국어로 자연스럽게 작성해주세요."
                f"생성된 홍보문구만 출력해주세요."
            )}
        ]
        promo_text = call_openai_api(messages)
        return jsonify({'promoText': promo_text})
    except Exception as e:
        print(f"Error in /generate-promo-effect endpoint: {e}")
        return jsonify({'error': f"서버 오류 발생: {e}"}), 500
    
# 유머 홍보 문구 생성
@task1.route('/generate-promo-humor', methods=['POST'])
def generate_promo_humor():
    try:
        input_data = request.json
        company_name = input_data.get('companyName', '')
        product_name = input_data.get('productName', '')
        product_info = input_data.get('productInfo', '')
        keywords = input_data.get('keywords', '')
        target_audience = input_data.get('targetAudience', '')
        file_content = input_data.get('fileContent', '')  # 파일 내용 처리

        if file_content:
            # 파일 내용이 있으면, 파일 내용으로 product_info를 대체하거나 필요한 데이터로 처리
            product_info = file_content  # 파일 내용을 제품 설명에 사용

        messages = [
            {"role": "system", "content": (
                "당신은 유머러스하면서도 자연스럽고 매력적인 홍보 문구를 작성하는 마케팅 전문가입니다. "
                "문구는 제품의 특징과 발림성, 향, 효과 등을 재치 있게 표현하며, 독특한 문장으로 소비자의 관심을 끌어야 합니다."
            )},
            {"role": "user", "content": (
                f"다음은 제품 정보입니다:\n"
                f"- 회사명: {company_name}\n"
                f"- 제품명: {product_name}\n"
                f"- 제품 설명: {product_info}\n"
                f"- 홍보 키워드: {keywords}\n"
                f"- 타겟 대상: {target_audience}\n\n"
                f"제품의 발림성, 향, 사용감 등 주요 특징을 중심으로 유머러스하고 매력적인 홍보 문구를 작성해주세요. "
                f"문구는 짧고 간결하게 작성하며, 일상생활에서 소비자가 공감할 수 있는 상황을 포함해주세요."
                f"생성된 홍보문구만 출력해주세요."
            )}
        ]
        promo_text = call_openai_api(messages)
        return jsonify({'promoText': promo_text})
    except Exception as e:
        print(f"Error in /generate-promo-humor endpoint: {e}")
        return jsonify({'error': f"서버 오류 발생: {e}"}), 500


# 맞춤형 홍보 문구 생성
@task1.route('/generate-promo-personalized', methods=['POST'])
def generate_promo_personalized():
    try:
        input_data = request.json
        company_name = input_data.get('companyName', '')
        product_name = input_data.get('productName', '')
        product_info = input_data.get('productInfo', '')
        keywords = input_data.get('keywords', '')
        target_audience = input_data.get('targetAudience', '')
        file_content = input_data.get('fileContent', '')  # 파일 내용 처리

        if file_content:
            # 파일 내용이 있으면, 파일 내용으로 product_info를 대체하거나 필요한 데이터로 처리
            product_info = file_content  # 파일 내용을 제품 설명에 사용

        messages = [
            {"role": "system", "content": "당신은 맞춤형 홍보 문구를 작성하는 마케팅 전문가입니다."},
            {"role": "user", "content": (
                f"다음은 제품 정보입니다:\n"
                f"- 회사명: {company_name}\n"
                f"- 제품명: {product_name}\n"
                f"- 제품 설명: {product_info}\n"
                f"- 홍보 키워드: {keywords}\n"
                f"- 타겟 대상: {target_audience}\n\n"
                f"이 정보를 바탕으로 사용자 맞춤형 홍보 문구를 한국어로 작성해주세요."
                f"생성된 홍보문구만 출력해주세요."
            )}
        ]
        promo_text = call_openai_api(messages)
        return jsonify({'promoText': promo_text})
    except Exception as e:
        print(f"Error in /generate-promo-personalized endpoint: {e}")
        return jsonify({'error': f"서버 오류 발생: {e}"}), 500