from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from models.user import User

auth_routes = Blueprint("auth_routes", __name__)

# Initialize the database connection
def init_user_routes(db):
    user_model = User(db)

    @auth_routes.route("/signup", methods=["POST"])
    def signup():
        data = request.json
        required_fields = ["first_name", "last_name", "email", "phone", "password"]

        # Validate input
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"message": f"{field} is required"}), 400

        # Check if the user already exists
        existing_user = user_model.find_user_by_email(data["email"])
        if existing_user:
            return jsonify({"message": "Email already exists"}), 400

        # Create user
        user_id = user_model.create_user(
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=data["email"],
            phone=data["phone"],
            password=data["password"],
        )
        return jsonify({"message": "User registered successfully", "user_id": user_id}), 201

    @auth_routes.route("/signin", methods=["POST"])
    def signin():
        data = request.json
        required_fields = ["email", "password"]

        # Validate input
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"message": f"{field} is required"}), 400

        # Find user
        user = user_model.find_user_by_email(data["email"])
        if not user:
            return jsonify({"message": "Invalid email or password"}), 401

        # Verify password
        if not user_model.verify_password(user["password"], data["password"]):
            return jsonify({"message": "Invalid email or password"}), 401

        return jsonify({"message": "Signin successful", "user_id": str(user["_id"])}), 200

    return auth_routes
