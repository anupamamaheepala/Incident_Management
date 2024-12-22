from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from bson.objectid import ObjectId

class User:
    def __init__(self, db):
        self.collection = db["users"]

    def create_user(self, first_name, last_name, email, phone, password):
        hashed_password = generate_password_hash(password)
        user = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "phone": phone,
            "password": hashed_password,
        }
        result = self.collection.insert_one(user)
        return str(result.inserted_id)

    def find_user_by_email(self, email):
        return self.collection.find_one({"email": email})

    def verify_password(self, stored_password, provided_password):
        return check_password_hash(stored_password, provided_password)
