from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from datetime import datetime, timedelta

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


    @incident_routes.route("/dashboard-stats", methods=["GET"])
    def get_dashboard_stats():
        """
        Returns the statistics for Admin Dashboard:
        - All Customers
        - Total Incidents
        - Completed Incidents
        - Unassigned Incidents (Pending)
        """
        try:
            all_customers = len(set(incidents.distinct("nic")))  # Unique NICs for customers
            total_incidents = incidents.count_documents({})
            completed_incidents = incidents.count_documents({"status": "Completed"})
            unassigned_incidents = incidents.count_documents({"status": "Pending"})

            stats = {
                "allCustomers": all_customers,
                "totalIncidents": total_incidents,
                "completedIncidents": completed_incidents,
                "unassignedIncidents": unassigned_incidents,
            }

            return jsonify(stats), 200
        except Exception as e:
            return jsonify({"message": "Error fetching dashboard stats", "error": str(e)}), 500


    @incident_routes.route("/incident-type-counts", methods=["GET"])
    def get_incident_type_counts():
        """
        Returns the count of incidents grouped by type.
        """
        try:
            pipeline = [
                {
                    "$group": {
                        "_id": "$incidentType",
                        "count": {"$sum": 1}
                    }
                },
                {
                    "$sort": {"count": -1}  # Sort by count in descending order
                }
            ]
            results = list(incidents.aggregate(pipeline))

            # Format the results
            type_counts = [{"name": result["_id"], "value": result["count"]} for result in results]

            return jsonify(type_counts), 200
        except Exception as e:
            return jsonify({"message": "Error fetching incident type counts", "error": str(e)}), 500
        

    @incident_routes.route("/incidents-by-date", methods=["GET"])
    def get_incidents_by_date():
        """
        Returns the count of incidents grouped by date for the past 7 days, including days with no incidents.
        """
        try:
            today = datetime.now()
            seven_days_ago = today - timedelta(days=6)

            # MongoDB aggregation to group incidents by date
            pipeline = [
                {"$match": {"dateTime": {"$gte": seven_days_ago.isoformat()}}},  # Filter last 7 days
                {
                    "$group": {
                        "_id": {"$dateToString": {"format": "%Y-%m-%d", "date": {"$dateFromString": {"dateString": "$dateTime"}}}},
                        "count": {"$sum": 1},
                    }
                },
                {"$sort": {"_id": 1}},  # Sort by date
            ]

            results = list(incidents.aggregate(pipeline))

            # Prepare a dictionary with counts for each of the past 7 days
            date_counts = {result["_id"]: result["count"] for result in results}

            # Fill in missing dates with 0 counts
            past_seven_days = [
                (seven_days_ago + timedelta(days=i)).strftime("%Y-%m-%d")
                for i in range(7)
            ]
            complete_data = {date: date_counts.get(date, 0) for date in past_seven_days}

            return jsonify(complete_data), 200

        except Exception as e:
            print(f"Error fetching incidents by date: {e}")
            return jsonify({"message": "Error fetching incidents by date", "error": str(e)}), 500

    return incident_routes
