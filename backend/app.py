from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow cross-origin

tasks = []

@app.route('/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks)

@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    task = data.get('task')
    if task:
        tasks.append(task)
        return 'Task added', 200
    else:
        return 'Invalid task data', 400

@app.route('/tasks/<int:task_index>', methods=['DELETE'])
def delete_task(task_index):
    if 0 <= task_index < len(tasks):
        tasks.pop(task_index)
        return 'Task deleted', 200
    else:
        return 'Task not found', 404

if __name__ == '__main__':
    app.run(debug=True, port=8080)
