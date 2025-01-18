from app import create_app
from flask_cors import CORS

RUN_CONFIG = {
    "debug": True,
    "host": "127.0.0.1",
    "port": 8080
}

app = create_app()
#CORS(app, origins='http://127.0.0.1:5173') # React server address
CORS(app, origins='*') # React server address

if __name__ == '__main__':
    app.run(**RUN_CONFIG)
