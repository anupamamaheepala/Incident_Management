from flask import Blueprint, redirect, url_for, session, jsonify, request
from authlib.integrations.flask_client import OAuth
from werkzeug.security import generate_password_hash
from models.user import User
from bson.objectid import ObjectId


auth_routes = Blueprint("auth_routes", __name__)
oauth = OAuth()

# Configure Google OAuth
oauth.register(
    name="google",
    client_id="6623246348-05rh90iudbrog6a75f6us0hkom6bu2rt.apps.googleusercontent.com",
    client_secret="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",
    access_token_url="https://accounts.google.com/o/oauth2/token",
    authorize_url="https://accounts.google.com/o/oauth2/auth",
    api_base_url="https://www.googleapis.com/oauth2/v1/",
    client_kwargs={"scope": "openid email profile"},
)


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
    

    # @auth_routes.route("/auth/google")
    # def google_login():
    #     # Redirect to Google's OAuth 2.0 login
    #     redirect_uri = url_for("auth_routes.google_callback", _external=True)
    #     return oauth.google.authorize_redirect(redirect_uri)
    
    # @auth_routes.route("/auth/google/callback")
    # def google_callback():
    #     # Handle Google OAuth callback
    #     try:
    #         token = oauth.google.authorize_access_token()
    #         user_info = oauth.google.get("userinfo").json()

    #         email = user_info["email"]
    #         first_name = user_info.get("given_name", "")
    #         last_name = user_info.get("family_name", "")

    #         # Check if user exists in the database
    #         user = user_model.find_user_by_email(email)
    #         if not user:
    #             # If the user doesn't exist, create a new account
    #             user_id = user_model.create_user(
    #                 first_name=first_name,
    #                 last_name=last_name,
    #                 email=email,
    #                 phone="",  # Google does not provide phone info
    #                 password="",  # Password is not required for Google accounts
    #             )
    #             user = user_model.collection.find_one({"_id": ObjectId(user_id)})

    #         # Set user session (if using session-based auth)
    #         session["user_id"] = str(user["_id"])

    #         return jsonify({"message": "Google sign-in successful", "user_id": str(user["_id"])}), 200

    #     except Exception as e:
    #         print(f"Error during Google callback: {e}")
    #         return jsonify({"message": "Google sign-in failed"}), 500

    @auth_routes.route("/auth/google", methods=["POST"])
    def google_auth():
        token = request.json.get("token")

        if not token:
            return jsonify({"message": "Token is required"}), 400

        try:
            # Verify token with Google
            user_info = oauth.google.parse_id_token(token)

            email = user_info["email"]
            first_name = user_info.get("given_name", "")
            last_name = user_info.get("family_name", "")

            # Check if user exists in the database
            user = user_model.find_user_by_email(email)
            if not user:
                # If the user doesn't exist, create a new account
                user_id = user_model.create_user(
                    first_name=first_name,
                    last_name=last_name,
                    email=email,
                    phone="",  # Optional
                    password="",  # Password not required for Google users
                )
                user = user_model.collection.find_one({"_id": ObjectId(user_id)})

            # Return user data or session token
            return jsonify({"message": "Google login successful", "user_id": str(user["_id"])}), 200

        except Exception as e:
            print(f"Error during Google login: {e}")
            return jsonify({"message": "Google login failed"}), 500

    
    @auth_routes.route("/get-user/<user_id>", methods=["GET"])
    def get_user(user_id):
        try:
            # Find the user by ID
            user = user_model.collection.find_one({"_id": ObjectId(user_id)})
            if not user:
                return jsonify({"message": "User not found"}), 404
            
            # Convert ObjectId to string for JSON serialization
            user["_id"] = str(user["_id"])
            return jsonify({"user": user}), 200
        except Exception as e:
            print(f"Error fetching user: {e}")
            return jsonify({"message": "Internal server error"}), 500

    @auth_routes.route("/update-user/<user_id>", methods=["PUT"])
    def update_user(user_id):
        data = request.json
        update_fields = {key: value for key, value in data.items() if value}
        result = user_model.collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_fields})
        if result.modified_count == 0:
            return jsonify({"message": "No changes made"}), 400
        return jsonify({"message": "User updated successfully"}), 200


    @auth_routes.route("/delete-account/<user_id>", methods=["DELETE"])
    def delete_account(user_id):
        try:
            # Check if user ID is valid
            if not ObjectId.is_valid(user_id):
                return jsonify({"message": "Invalid user ID"}), 400

            # Delete user from the database
            result = user_model.collection.delete_one({"_id": ObjectId(user_id)})

            if result.deleted_count == 0:
                return jsonify({"message": "User not found"}), 404

            return jsonify({"message": "Account deleted successfully"}), 200
        except Exception as e:
            print(f"Error deleting user: {e}")
            return jsonify({"message": "Internal server error"}), 500

    
    return auth_routes
