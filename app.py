from flask import Flask

app = Flask(__name__)

creatures = [
    {
        "name": "Sand Worm",
        "danger": 8
    }
]

@app.route("/creatures")
def get_creatures():
    return creatures
