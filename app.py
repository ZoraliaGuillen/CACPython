from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
app=Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI']='mysql+pymysql://root:1234@localhost/proyecto'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db=SQLAlchemy(app)
ma=Marshmallow(app)

class Producto(db.Model):
    id=db.Column(db.Integer, primary_key=True)
    isbn=db.Column(db.String(100))
    author=db.Column(db.String(100))
    category=db.Column(db.String(100))
    country=db.Column(db.String(100))
    description=db.Column(db.String(1000))
    editorial=db.Column(db.String(100))
    genre=db.Column(db.String(100))
    language=db.Column(db.String(100))
    photo=db.Column(db.String(1000))
    price=db.Column(db.Integer)
    priceOff=db.Column(db.Integer)
    subgenre=db.Column(db.String(100))
    title=db.Column(db.String(100))
    type=db.Column(db.String(100))
    year=db.Column(db.String(100))
    def  __init__(self,isbn,author,category,country,description,editorial,genre,language,photo,price,priceOff,subgenre,title,type,year):
        self.isbn=isbn
        self.author=author
        self.category=category
        self.country=country
        self.description=description
        self.editorial=editorial
        self.genre=genre
        self.language=language
        self.photo=photo
        self.price=price
        self.priceOff=priceOff
        self.subgenre=subgenre
        self.title=title
        self.type=type
        self.year=year

with app.app_context():
    db.create_all()

class ProductoSchema(ma.Schema):
    class Meta:
        fields=('id','isbn','author','category','country','description','editorial','genre','language','photo','price','priceOff','subgenre','title','type','year')

producto_schema=ProductoSchema()
productos_schema=ProductoSchema(many=True)

#Obtener todos los productos
@app.route('/productos',methods=['GET'])
def get_all_productos():
    all_productos=Producto.query.all()
    result=productos_schema.dump(all_productos)

    return jsonify(result)

#Obtener un producto
@app.route('/productos/<id>',methods=['GET'])
def get_producto(id):
    producto=Producto.query.get(id)

    return producto_schema.jsonify(producto)

#Eliminar un producto
@app.route('/productos/<id>',methods=['DELETE'])
def delete_producto(id):
    producto=Producto.query.get(id)
    db.session.delete(producto)
    db.session.commit()

    return producto_schema.jsonify(producto)

#Crear un producto
@app.route('/productos',methods=['POST'])
def create_producto():
    isbn=request.json['isbn']
    author=request.json['author']
    category=request.json['category']
    country=request.json['country']
    description=request.json['description']
    editorial=request.json['editorial']
    genre=request.json['genre']
    language=request.json['language']
    photo=request.json['photo']
    price=request.json['price']
    priceOff=request.json['priceOff']
    subgenre=request.json['subgenre']
    title=request.json['title']
    type=request.json['type']
    year=request.json['year']
    new_producto=Producto(isbn,author,category,country,description,editorial,genre,language,photo,price,priceOff,subgenre,title,type,year)
    db.session.add(new_producto)
    db.session.commit()

    return producto_schema.jsonify(new_producto)

#Modificar un producto
@app.route('/productos/<id>',methods=['PUT'])
def update_producto(id):
    producto=Producto.query.get(id)

    isbn=request.json['isbn']
    author=request.json['author']
    category=request.json['category']
    country=request.json['country']
    description=request.json['description']
    editorial=request.json['editorial']
    genre=request.json['genre']
    language=request.json['language']
    photo=request.json['photo']
    price=request.json['price']
    priceOff=request.json['priceOff']
    subgenre=request.json['subgenre']
    title=request.json['title']
    type=request.json['type']
    year=request.json['year']

    producto.isbn=isbn
    producto.author=author
    producto.category=category
    producto.country=country
    producto.description=description
    producto.editorial=editorial
    producto.genre=genre
    producto.language=language
    producto.photo=photo
    producto.price=price
    producto.priceOff=priceOff
    producto.subgenre=subgenre
    producto.title=title
    producto.type=type
    producto.year=year

    db.session.commit()

    return producto_schema.jsonify(producto)

if __name__=='__main__':
    app.run(debug=True, port=5000)