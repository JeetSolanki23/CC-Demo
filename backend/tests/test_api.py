from fastapi.testclient import TestClient

from main import app

client = TestClient(app)


def test_hello_endpoint():
    response = client.get("/api/hello")
    assert response.status_code == 200
    body = response.json()
    assert body["status"] == "success"
    assert "message" in body
    assert "version" in body
