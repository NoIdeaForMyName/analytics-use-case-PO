from flask import current_app as app, jsonify, send_file

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route("/test", methods=["GET"])
def test():
    print("test")
    return jsonify({"hello": "Hello World!"}), 200

@app.route("/analytics/get-all-reports-by-bike", methods=["GET"])
def get_all_reports_by_bike():
    file_path = '../data/bike_reports.json'
    return send_file(file_path, mimetype='application/json')
