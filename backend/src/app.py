from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_session import Session
from models import db, User
import secrets

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = r'sqlite:///./db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = secrets.token_hex(16)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"

Session(app)
CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)

db.init_app(app)
with app.app_context():
    db.create_all()

@app.route("/@me", methods=['GET'])
def getCurrentUser():
    userId = session.get("user")

    if not userId:
        return jsonify({'msg': 'unauthorized'}), 401
    
    user = User.query.filter_by(id = userId).first()
    return jsonify(
        {
            'username': user.username,
        }
    )


@app.route('/signup', methods=['POST'])
def signUp():
    username = request.json['username']
    email = request.json['email']

    userExists = User.query.filter_by(username=username).first() is not None
    emailExists = User.query.filter_by(email=email).first() is not None

    if userExists or emailExists:
        return jsonify({'msg': 'user or email exists'}), 409
    
    password = bcrypt.generate_password_hash(request.json['password'])
    user = User(username=username, email=email, password=password)
    db.session.add(user)
    db.session.commit()

    return jsonify(user.id)

@app.route('/login', methods=['POST'])
def login():
    username = request.json['username']
    password = request.json['password']

    user = User.query.filter_by(username=username).first()

    if user is None:
        return jsonify({'msg': 'incorrect user or password'}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({'msg': 'incorrect user or password'}), 401
    
    session['user'] = user.id
    return jsonify(
        {
        'user': user.username
        }
    )

@app.route('/logout', methods=['GET'])
def logout():
    session.pop('user')
    return "200"

if __name__ == "__main__":
    app.run(debug=True) 