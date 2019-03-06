from flask import Flask, request, jsonify

from sources import processing, initGlobal

initGlobal()

print("Launching app...")
app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
	return jsonify(status='online')

@app.route('/process', methods=['POST'])
def process():
	data = request.get_json()['user_data']

	return jsonify({ 'processed': processing(data) })