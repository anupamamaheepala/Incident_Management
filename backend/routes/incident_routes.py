# from flask import Blueprint, request, jsonify
# from bson.objectid import ObjectId

# def init_incident_routes(db):
#     incident_routes = Blueprint("incidents", __name__)
#     incidents = db.incidents

#     @incident_routes.route("/report", methods=["POST"])
#     def report_incident():
#         """
#         Reports a new incident and stores it in the database.
#         """
#         data = request.json

#         # Validate required fields
#         required_fields = ["userId", "name", "email", "connectionNumber", "nic", "incidentType", "description", "status"]
#         for field in required_fields:
#             if field not in data or not data[field]:
#                 return jsonify({"message": f"{field} is required"}), 400

#         # Prepare incident document
#         incident = {
#             "userId": ObjectId(data["userId"]),
#             "name": data["name"],
#             "email": data["email"],
#             "connectionNumber": data["connectionNumber"],
#             "nic": data["nic"],
#             "incidentType": data["incidentType"],
#             "description": data["description"],
#             "status": data["status"],
#         }

#         # Insert into database
#         result = incidents.insert_one(incident)
#         return jsonify({"message": "Incident reported successfully", "incidentId": str(result.inserted_id)}), 201

#     @incident_routes.route("/<user_id>", methods=["GET"])
#     def get_user_incidents(user_id):
#         """
#         Retrieves all incidents for a specific user.
#         """
#         try:
#             user_incidents = list(incidents.find({"userId": ObjectId(user_id)}))
#             for incident in user_incidents:
#                 incident["_id"] = str(incident["_id"])  # Convert ObjectId to string
#                 incident["userId"] = str(incident["userId"])
#             return jsonify(user_incidents), 200
#         except Exception as e:
#             return jsonify({"message": "Error retrieving incidents", "error": str(e)}), 500


#     @incident_routes.route("/admin/incidents", methods=["GET"])
#     def get_all_incidents():
#         print("Fetching all incidents...")  # Debugging print statement
#         try:
#             all_incidents = list(incidents.find())
#             print("Incidents found:", all_incidents)  # Debugging print statement
#             for incident in all_incidents:
#                 incident["_id"] = str(incident["_id"])  # Convert ObjectId to string
#                 incident["userId"] = str(incident["userId"])
#             return jsonify(all_incidents), 200
#         except Exception as e:
#             print("Error:", str(e))  # Debugging print statement
#             return jsonify({"message": "Error retrieving incidents", "error": str(e)}), 500

#     return incident_routes


from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from datetime import datetime

def init_incident_routes(db):
    incident_routes = Blueprint("incidents", __name__)
    incidents = db.incidents

    @incident_routes.route("/report", methods=["POST"])
    def report_incident():
        """
        Reports a new incident and stores it in the database.
        """
        data = request.json

        # Validate required fields
        required_fields = ["userId", "name", "email", "connectionNumber", "nic", "incidentType", "description", "status"]
        for field in required_fields:
            if field not in data or not data[field]:
                return jsonify({"message": f"{field} is required"}), 400

        # Prepare incident document
        incident = {
            "userId": ObjectId(data["userId"]),
            "name": data["name"],
            "email": data["email"],
            "connectionNumber": data["connectionNumber"],
            "nic": data["nic"],
            "incidentType": data["incidentType"],
            "description": data["description"],
            "status": data["status"],
            "dateTime": data.get("dateTime", datetime.now().isoformat()),  # Assign current date and time if not provided
        }

        # Insert into database
        result = incidents.insert_one(incident)
        return jsonify({"message": "Incident reported successfully", "incidentId": str(result.inserted_id)}), 201

    @incident_routes.route("/<user_id>", methods=["GET"])
    def get_user_incidents(user_id):
        """
        Retrieves all incidents for a specific user.
        """
        try:
            user_incidents = list(incidents.find({"userId": ObjectId(user_id)}))
            for incident in user_incidents:
                incident["_id"] = str(incident["_id"])  # Convert ObjectId to string
                incident["userId"] = str(incident["userId"])
            return jsonify(user_incidents), 200
        except Exception as e:
            return jsonify({"message": "Error retrieving incidents", "error": str(e)}), 500

    @incident_routes.route("/admin/incidents", methods=["GET"])
    def get_all_incidents():
        """
        Retrieves all incidents for the admin view.
        """
        try:
            all_incidents = list(incidents.find())
            for incident in all_incidents:
                incident["_id"] = str(incident["_id"])  # Convert ObjectId to string
                incident["userId"] = str(incident["userId"])
            return jsonify(all_incidents), 200
        except Exception as e:
            return jsonify({"message": "Error retrieving incidents", "error": str(e)}), 500

    return incident_routes
