from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from routes.auth_routes import init_user_routes
from routes.incident_routes import init_incident_routes
from config import Config

# Initialize Flask app
app = Flask(__name__)

# Enable CORS
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

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

# Handle error responses for better debugging
@app.errorhandler(404)
def not_found_error(error):
    return {"error": "Not found"}, 404

@app.errorhandler(500)
def internal_error(error):
    return {"error": "Internal server error"}, 500

if __name__ == "__main__":
    app.run(debug=True)
