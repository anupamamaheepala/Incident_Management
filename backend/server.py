from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from routes.auth_routes import init_user_routes
from routes.incident_routes import init_incident_routes
from config import Config

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure MongoDB
app.config.from_object(Config)
mongo = PyMongo(app)

# Initialize routes
auth_routes = init_user_routes(mongo.db)
incident_routes = init_incident_routes(mongo.db)

app.register_blueprint(auth_routes, url_prefix="/auth")
app.register_blueprint(incident_routes, url_prefix="/incidents")

@app.route("/")
def home():
    return {"message": "API is running"}, 200

if __name__ == "__main__":
    app.run(debug=True)
