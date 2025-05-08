from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error
import mysql.connector

app = Flask(__name__)
CORS(app)

# Configuração de conexão com o banco de dados
DB_CONFIG = {
    'host':'localhost',
    'user':'root',
    'password':'senai',
    'database':'papelaria',
    'auth_plugin':'mysql_native_password'
}

def conecta_DB():
    conexaoDB = mysql.connector.connect(**DB_CONFIG)
    cursorDB = conexaoDB.cursor()
    return conexaoDB, cursorDB


def close_db(conexaoDB, cursorDB):
    cursorDB.close()
    conexaoDB.close()

# Rota para cadastrar um novo produto
@app.route('/produto', methods=['POST'])
def cadastro_produto():
    conexaoDB = None
    cursorDB = None
    try:
        dados = request.json
        nome = dados.get('nome')
        descricao = dados.get('descricao')
        preco = dados.get('preco')
        quantidade = dados.get('quantidade')
        img = dados.get('img')  # <- nova linha
        
        if not all([nome, descricao, preco, quantidade, img]):
            return jsonify({'erro': 'Dados incompletos'}), 400
        
        conexaoDB, cursorDB = conecta_DB()
        comandoSQL = 'INSERT INTO Produto (img, nome, descricao, preco, quantidade) VALUES (%s,%s,%s,%s,%s)'
        cursorDB.execute(comandoSQL, (img, nome, descricao, preco, quantidade))
        conexaoDB.commit()
        
        return jsonify({'mensagem': 'Cadastro realizado'}), 201
    except Error as erro:
        return jsonify({'erro': f'{erro}'}), 500
    except KeyError:
        return jsonify({'erro': 'Faltando informação'}), 400
    finally:
        if conexaoDB and cursorDB:
            close_db(conexaoDB, cursorDB)


# Rota para listar todos os produtos
@app.route('/produto', methods=['GET'])
def listar_produtos():
    conexaoDB = None
    cursorDB = None
    try:
        conexaoDB, cursorDB = conecta_DB()
        comandoSQL = "SELECT * FROM Produto"
        cursorDB.execute(comandoSQL)
        produtos = cursorDB.fetchall()
        
        if not produtos:
            return jsonify({'mensagem':'Não há produtos'}), 200
        
        return jsonify(produtos), 200
    except Error as erro:
        return jsonify({'erro': f'{erro}'}), 500
    finally:
        if conexaoDB and cursorDB:
            close_db(conexaoDB, cursorDB)

# Rota para obter um produto específico pelo ID
@app.route('/produto/<int:id_produto>', methods=['GET'])
def get_produto(id_produto):
    conexaoDB = None
    cursorDB = None
    try:
        conexaoDB, cursorDB = conecta_DB()
        comandoSQL = 'SELECT * FROM Produto WHERE idProduto = %s'
        cursorDB.execute(comandoSQL, (id_produto,))
        produto = cursorDB.fetchone()
       
        if not produto:
            return jsonify({'mensagem':'Produto não encontrado'}), 200

        produtojson = {
            "idproduto": produto[0],
            "img": produto[1],
            "nome": produto[2],
            "descricao": produto[3],
            "preco": produto[4],
            "quantidade": produto[5]
        }
        return jsonify(produtojson), 200
    except Error as erro:
        return jsonify({'erro': f'{erro}'}), 500
    finally:
        if conexaoDB and cursorDB:
            close_db(conexaoDB, cursorDB)

# Rota para atualizar os dados de um produto
@app.route('/produto', methods=['PUT'])
def update_produto():
    conexaoDB = None
    cursorDB = None
    try:
        dados = request.json
        idproduto = dados.get('idproduto')
        nome = dados.get('nome')
        descricao = dados.get('descricao')
        preco = dados.get('preco')
        quantidade = dados.get('quantidade')
        img = dados.get('img')

        if not idproduto or not nome or not descricao or not preco or not quantidade:
            return jsonify({'erro': 'Faltando informação'}), 400
        
        conexaoDB, cursorDB = conecta_DB()
        comandoSQL = f'UPDATE Produto SET nome = %s, descricao = %s, preco = %s, quantidade = %s WHERE idproduto = %s'
        cursorDB.execute(comandoSQL, (nome, descricao, preco, quantidade, idproduto))
        conexaoDB.commit()

        return jsonify({'mensagem':'Alteração realizada'}), 200
    except Error as erro:
        return jsonify({'erro': f'{erro}'}), 500
    except KeyError:
        return jsonify({'erro':'Faltando informação'}), 500
    finally:
        if conexaoDB and cursorDB:
            close_db(conexaoDB, cursorDB)

# Rota para deletar um produto pelo ID
@app.route('/produto', methods=['DELETE'])
def delete_produto():
    conexaoDB = None
    cursorDB = None
    try:
        dados = request.json
        id_produto = dados.get('idproduto')
        conexaoDB, cursorDB = conecta_DB()
        comandoSQL = f'DELETE FROM Produto WHERE idProduto = %s'
        cursorDB.execute(comandoSQL, (id_produto,))
        conexaoDB.commit()

        return jsonify({'mensagem':'Produto excluido'}), 200
    except Error as erro:
        return jsonify({'erro': f'{erro}'}), 500
    except KeyError:
        return jsonify({'erro':'Faltando informação'}), 500
    finally:
        if conexaoDB and cursorDB:
            close_db(conexaoDB, cursorDB)



# ERRO 404
@app.errorhandler(404)
def pagina_nao_encontrada(erro):
    return jsonify({'erro': 'pagina nao encontrada'})

# ERRO 405
@app.errorhandler(405)
def metodo_invalido(erro):
    return jsonify({'erro': 'Método HTTP invalido'}), 405

# ERRO 500
@app.errorhandler(500)
def erro_servidor(erro):
    return jsonify({'erro': 'Erro interno no Servidor'}), 500   
        
        
# Inicia o servidor
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
