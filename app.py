from flask import Flask, send_from_directory, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return send_from_directory('pages', 'index.html')

@app.route('/index')
def index():
    return send_from_directory('pages', 'index.html')

@app.route('/about')
def about():
    return send_from_directory('pages', 'about.html')

@app.route('/signin')
def signin():
    return send_from_directory('pages', 'signin.html')

@app.route('/signup')
def signup():
    return send_from_directory('pages', 'signup.html')

@app.route('/verify')
def verify():
    return send_from_directory('pages', 'verify.html')

# Custom 404 error handler
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

# Serving the static JavaScript file
@app.route('/queries')
def queries():
    return send_from_directory('static', 'queries.js')

if __name__ == '__main__':
        app.run(host='127.0.0.1', port=5050, debug=True)
