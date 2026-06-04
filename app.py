from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=[
    "https://n-ashworth.github.io"
])

creatures = [
    {
        "name": "Sand Worm",
        "danger": 8
    }
]

@app.route("/creatures")
def get_creatures():
    return creatures
