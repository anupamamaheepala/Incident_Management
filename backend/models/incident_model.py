from bson.objectid import ObjectId

class IncidentModel:
    def __init__(self, db):
        self.collection = db.incidents

    def create_incident(self, incident_data):
        """
        Inserts a new incident into the database.
        """
        result = self.collection.insert_one(incident_data)
        return str(result.inserted_id)

    def get_user_incidents(self, user_id):
        """
        Retrieves all incidents for a specific user.
        """
        incidents = list(self.collection.find({"userId": ObjectId(user_id)}))
        for incident in incidents:
            incident["_id"] = str(incident["_id"])  # Convert ObjectId to string
            incident["userId"] = str(incident["userId"])
        return incidents
