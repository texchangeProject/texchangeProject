rom flask.ext.sqlalchemy import SQLAlchemy
from run import app
import sys
import io

db = SQLAlchemy(app)

class School(db.Model):
    __tablename_ = 'schools'
    
    id = db.Column(db.Integer, primary_key = True)
    school_name = db.Column(db.Unicode)
    students = db.relationship('User', backref = 'schools')
    

class User(db.model):
    __tablename__ = "users"
    
    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.Unicode)
    lname = db.Column(db.Unicode)
    school_id = db.Column(db.Integer, db.ForeignKey('schools.id'))
    textbooks = db.relationship('Textbook', backref = 'users')
    password = db.Column(db.Unicode)

    
    
class Textbook(db.model):
    __tablename__ = 'textbooks'
    id = db.Column(db.Integer, primary_key = True)
    book_name = db.Column(db.Unicode)
    isbn = db.Column(db.Unicode)
    student_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
