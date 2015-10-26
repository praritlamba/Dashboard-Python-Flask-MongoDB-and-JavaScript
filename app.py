from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'delhi'
COLLECTION_NAME = 'projects'
FIELDS = {'AUTHORIZED_CAPITAL':True,'PAIDUP_CAPITAL':True,'COMPANY_STATUS':True,'PRINCIPAL_BUSINESS_ACTIVITY':True,'COMPANY_NAME':True,'COMPANY_CLASS':True,'_id':False}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/delhi/projects")
def donorschoose_projects():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS, limit=10000)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()
    return json_projects

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=5000,debug=True)