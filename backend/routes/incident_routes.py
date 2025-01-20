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


    @incident_routes.route("/type/<incident_type>", methods=["GET"])
    def get_incidents_by_type(incident_type):
        """
        Fetch all incidents of a specific type.
        """
        try:
            print(f"Fetching incidents of type: {incident_type}")  # Debugging print
            incidents_by_type = list(incidents.find({"incidentType": incident_type}))
            for incident in incidents_by_type:
                incident["_id"] = str(incident["_id"])  # Convert ObjectId to string
                incident["userId"] = str(incident["userId"])
            print(f"Found incidents: {incidents_by_type}")  # Debugging print
            return jsonify(incidents_by_type), 200
        except Exception as e:
            print(f"Error: {str(e)}")  # Debugging print
            return jsonify({"message": "Error retrieving incidents", "error": str(e)}), 500


    @incident_routes.route("/<incident_id>", methods=["PATCH"])
    def update_incident_status(incident_id):
        """
        Updates the status of a specific incident.
        """
        data = request.json
        if "status" not in data:
            return jsonify({"message": "Status is required"}), 400

        try:
            result = incidents.update_one(
                {"_id": ObjectId(incident_id)},
                {"$set": {"status": data["status"]}}
            )
            if result.modified_count == 1:
                return jsonify({"message": "Status updated successfully"}), 200
            return jsonify({"message": "No changes made"}), 200
        except Exception as e:
            return jsonify({"message": "Error updating status", "error": str(e)}), 500
        
    @incident_routes.route("/status-counts", methods=["GET"])
    def get_status_counts():
        """
        Returns the count of incidents grouped by type and status.
        """
        try:
            pipeline = [
                {
                    "$group": {
                        "_id": {"type": "$incidentType", "status": "$status"},
                        "count": {"$sum": 1}
                    }
                },
                {
                    "$group": {
                        "_id": "$_id.type",
                        "statuses": {
                            "$push": {
                                "status": "$_id.status",
                                "count": "$count"
                            }
                        }
                    }
                }
            ]
            results = list(incidents.aggregate(pipeline))
            print("Pipeline results:", results)  # Debugging print

            # Format the results
            status_counts = {}
            for result in results:
                type_name = result["_id"]
                counts = {item["status"]: item["count"] for item in result["statuses"]}
                status_counts[type_name] = counts

            print("Formatted counts:", status_counts)  # Debugging print
            return jsonify(status_counts), 200
        except Exception as e:
            print("Error during aggregation:", str(e))  # Debugging print
            return jsonify({"message": "Error calculating status counts", "error": str(e)}), 500



    return incident_routes
