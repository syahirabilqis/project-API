from flask import Flask, request, send_file, render_template, url_for
from yt_dlp import YoutubeDL
import uuid, os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/download', methods=['POST'])
def download():
    data = request.get_json()
    url = data.get('url')
    file_id = str(uuid.uuid4())
    filename = f"{file_id}.mp4"

    options = {
        'outtmpl': filename,
        'format': 'mp4',
        'quiet': True
    }

    try:
        with YoutubeDL(options) as ydl:
            ydl.download([url])
        return send_file(filename, mimetype='video/mp4', as_attachment=True)
    finally:
        if os.path.exists(filename):
            os.remove(filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0')