from flask import Flask, request, jsonify

from processing import processing

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
	return jsonify(status='online')

@app.route('/process', methods=['POST'])
def process():
	data = request.get_json()
	print(data['user_data'])
	processed = processing(data['user_data'])

	res = { 'processed': processed }

	return jsonify(res)