from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from models.user import User
from bson.objectid import ObjectId


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



# from flask import Blueprint, request, jsonify, redirect
# from authlib.integrations.flask_client import OAuth
# from werkzeug.security import generate_password_hash, check_password_hash
# from models.user import User
# from bson.objectid import ObjectId

# auth_routes = Blueprint("auth_routes", __name__)
# oauth = OAuth()

# # Initialize routes and OAuth
# def init_user_routes(app, db):
#     user_model = User(db)

#     # Configure Google OAuth
#     oauth.init_app(app)
#     oauth.register(
#         "google",
#         client_id="YOUR_GOOGLE_CLIENT_ID",
#         client_secret="YOUR_GOOGLE_CLIENT_SECRET",
#         server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
#         client_kwargs={"scope": "openid email profile"},
#     )

#     # Configure Facebook OAuth
#     oauth.register(
#         "facebook",
#         client_id="YOUR_FACEBOOK_APP_ID",
#         client_secret="YOUR_FACEBOOK_APP_SECRET",
#         api_base_url="https://graph.facebook.com",
#         access_token_url="https://graph.facebook.com/oauth/access_token",
#         authorize_url="https://www.facebook.com/dialog/oauth",
#         client_kwargs={"scope": "email"},
#     )

#     @auth_routes.route("/signup", methods=["POST"])
#     def signup():
#         data = request.json
#         required_fields = ["first_name", "last_name", "email", "phone", "password"]

#         # Validate input
#         for field in required_fields:
#             if field not in data or not data[field]:
#                 return jsonify({"message": f"{field} is required"}), 400

#         # Check if user exists
#         existing_user = user_model.find_user_by_email(data["email"])
#         if existing_user:
#             return jsonify({"message": "Email already exists"}), 400

#         # Create user
#         hashed_password = generate_password_hash(data["password"])
#         user_id = user_model.create_user(
#             first_name=data["first_name"],
#             last_name=data["last_name"],
#             email=data["email"],
#             phone=data["phone"],
#             password=hashed_password,
#         )
#         return jsonify({"message": "User registered successfully", "user_id": user_id}), 201

#     @auth_routes.route("/signin", methods=["POST"])
#     def signin():
#         data = request.json
#         required_fields = ["email", "password"]

#         # Validate input
#         for field in required_fields:
#             if field not in data or not data[field]:
#                 return jsonify({"message": f"{field} is required"}), 400

#         # Find user
#         user = user_model.find_user_by_email(data["email"])
#         if not user:
#             return jsonify({"message": "Invalid email or password"}), 401

#         # Verify password
#         if not check_password_hash(user["password"], data["password"]):
#             return jsonify({"message": "Invalid email or password"}), 401

#         return jsonify({"message": "Signin successful", "user_id": str(user["_id"])}), 200

#     @auth_routes.route("/login/google", methods=["GET"])
#     def login_google():
#         redirect_uri = request.host_url + "auth/google/callback"
#         return oauth.google.authorize_redirect(redirect_uri)

#     @auth_routes.route("/auth/google/callback", methods=["GET"])
#     def google_callback():
#         token = oauth.google.authorize_access_token()
#         user_info = oauth.google.parse_id_token(token)
#         email = user_info["email"]
#         name = user_info["name"]

#         # Check if user exists or create a new one
#         user = user_model.find_user_by_email(email)
#         if not user:
#             user_id = user_model.create_user(
#                 first_name=name.split()[0],
#                 last_name=name.split()[-1],
#                 email=email,
#                 phone="",
#                 password="",  # No password for social login
#             )
#         else:
#             user_id = str(user["_id"])

#         return jsonify({"message": "Google login successful", "user_id": user_id})

#     @auth_routes.route("/login/facebook", methods=["GET"])
#     def login_facebook():
#         redirect_uri = request.host_url + "auth/facebook/callback"
#         return oauth.facebook.authorize_redirect(redirect_uri)

#     @auth_routes.route("/auth/facebook/callback", methods=["GET"])
#     def facebook_callback():
#         token = oauth.facebook.authorize_access_token()
#         user_info = oauth.facebook.get("me?fields=id,name,email").json()
#         email = user_info.get("email")
#         name = user_info.get("name")

#         # Check if user exists or create a new one
#         user = user_model.find_user_by_email(email)
#         if not user:
#             user_id = user_model.create_user(
#                 first_name=name.split()[0],
#                 last_name=name.split()[-1],
#                 email=email,
#                 phone="",
#                 password="",  # No password for social login
#             )
#         else:
#             user_id = str(user["_id"])

#         return jsonify({"message": "Facebook login successful", "user_id": user_id})

#     @auth_routes.route("/get-user/<user_id>", methods=["GET"])
#     def get_user(user_id):
#         try:
#             user = user_model.collection.find_one({"_id": ObjectId(user_id)})
#             if not user:
#                 return jsonify({"message": "User not found"}), 404

#             user["_id"] = str(user["_id"])
#             return jsonify({"user": user}), 200
#         except Exception as e:
#             return jsonify({"message": "Error fetching user", "error": str(e)}), 500

#     @auth_routes.route("/delete-account/<user_id>", methods=["DELETE"])
#     def delete_account(user_id):
#         try:
#             if not ObjectId.is_valid(user_id):
#                 return jsonify({"message": "Invalid user ID"}), 400

#             result = user_model.collection.delete_one({"_id": ObjectId(user_id)})
#             if result.deleted_count == 0:
#                 return jsonify({"message": "User not found"}), 404

#             return jsonify({"message": "Account deleted successfully"}), 200
#         except Exception as e:
#             return jsonify({"message": "Error deleting user", "error": str(e)}), 500

#     return auth_routes
