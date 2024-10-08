from app import app


def test_home_route():
    response = app.test_client().get('/')
    assert response.status_code == 200
    assert b"<title>Event Master</title>" in response.data


def test_index_route():
    response = app.test_client().get('/index')
    assert response.status_code == 200
    assert b"<title>Event Master</title>" in response.data


def test_about_route():
    response = app.test_client().get('/about')
    assert response.status_code == 200
    assert b"<title>About Us</title>" in response.data


def test_sign_in_route():
    response = app.test_client().get('/signin')
    assert response.status_code == 200
    assert b"<title>Sign In</title>" in response.data


def test_sign_up_route():
    response = app.test_client().get('/signup')
    assert response.status_code == 200
    assert b"<title>Sign Up</title>" in response.data


def test_verify_route():
    response = app.test_client().get('/verify')
    assert response.status_code == 200
    assert b"<title>Verify Email</title>" in response.data